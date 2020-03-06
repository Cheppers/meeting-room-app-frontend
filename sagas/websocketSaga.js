import {
  take, call, put, delay, select,
  race, fork, cancel,
} from 'redux-saga/effects';
import moment from 'moment';
import {
  SELECT_RESOURCE, SHOW_RESOURCES,
  RESOURCES_GET_EVENTS_REQUESTED, RESOURCES_GET_EVENTS_SUCCEEDED,
  RESOURCES_GET_EVENTS_FAILED, STORE_EVENTS, UPDATE_EVENTS,
  RESTORE_AFTER_CRASH,
} from '../consts/actionTypes';
import * as API from '../services/api';
import socketConnection from '../services/socket';
import * as NavigationService from '../services/navigationService';

const getEventsStore = (store) => store.events;
const getTokenStore = (store) => store.token;


export function* getEvents(resourceId) {
  const { backendUrl, token } = yield select(getTokenStore);
  return yield call(API.getData, `${backendUrl}/api/event/${resourceId}`, token);
}

export function* eventsSync() {
  yield take(RESOURCES_GET_EVENTS_SUCCEEDED);

  try {
    while (true) {
      const timeStamp = moment();
      const eventsStore = yield select(getEventsStore);
      const filteredEvents = eventsStore.events.filter((event) => (
        !moment(event.end).isBefore(timeStamp)
      ));

      if (filteredEvents.length > 0) {
        const isOccupied = timeStamp.isBetween(filteredEvents[0].start, filteredEvents[0].end);
        const delaySeconds = isOccupied
          ? moment(filteredEvents[0].end).diff(timeStamp, 'seconds')
          : moment(filteredEvents[0].start).diff(timeStamp, 'seconds');

        yield put({
          type: STORE_EVENTS,
          payload: {
            events: filteredEvents,
            isOccupied,
            loading: false,
          },
        });

        // TODO: onboarding
        // if (isOccupied && delaySeconds > 300 && !filteredEvents[0].is_confirmed) {
        //   NavigationService.navigate('Onboarding');
        // }

        yield race([
          take(UPDATE_EVENTS),
          delay((delaySeconds * 1000) + 1000),
        ]);
      } else {
        yield put({
          type: STORE_EVENTS,
          payload: {
            events: [],
            isOccupied: false,
            loading: false,
          },
        });
        yield take(UPDATE_EVENTS);
      }
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

export function* main(dispatch) {
  yield take('SET_WEBSOCKET');
  const { backendUrl } = yield select(getTokenStore);
  socketConnection.createConnection(`${backendUrl}:3000`);
  const socket = socketConnection.getSocket();

  socket.on('calendarEvents', (data) => {
    dispatch({
      type: UPDATE_EVENTS,
      payload: {
        events: data,
      },
    });
  });

  socket.on('connect_error', (error) => {
    console.log(error); // eslint-disable-line
    NavigationService.navigate('Error');
  });

  socket.on('disconnect', () => {
    socket.on('connect', () => {
      dispatch({ type: RESTORE_AFTER_CRASH });
    });
  });

  while (true) {
    const selectResourceAction = yield take(SELECT_RESOURCE);
    const resourceId = selectResourceAction.payload.resource.resource_id;
    socket.emit('join', `ws-${resourceId}`);
    const eventsSyncTask = yield fork(eventsSync);

    yield put({
      type: RESOURCES_GET_EVENTS_REQUESTED,
    });
    try {
      const events = yield call(getEvents, resourceId);
      yield put({
        type: RESOURCES_GET_EVENTS_SUCCEEDED,
        payload: {
          events,
        },
      });
    } catch (error) {
      console.log(error); // eslint-disable-line

      yield put({
        type: RESOURCES_GET_EVENTS_FAILED,
      });
    }

    yield take(SHOW_RESOURCES);
    socket.emit('leave', `ws-${resourceId}`);
    yield cancel(eventsSyncTask);
  }
}

export const websocketSaga = main;
