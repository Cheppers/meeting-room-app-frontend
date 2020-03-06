import {
  takeEvery, call, put, delay, select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import moment from 'moment';
import socketConnection from '../services/socket';
import {
  GET_RESOURCES_REQUESTED, GET_RESOURCES_SUCCEEDED, GET_RESOURCES_FAILED,
  CREATE_MEETING_REQUESTED, CREATE_MEETING_SUCCEEDED, CREATE_MEETING_FAILED,
  RESTORE_AFTER_CRASH, SHOW_RESOURCES, CANCEL_MEETING_REQUESTED,
  CANCEL_MEETING_SUCCEEDED, CANCEL_MEETING_FAILED, CONFIRM_MEETING_REQUESTED,
  CONFIRM_MEETING_SUCCEEDED, CONFIRM_MEETING_FAILED,
  SAVE_CONFIGURATION,
} from '../consts/actionTypes';
import * as API from '../services/api';
import * as NavigationService from '../services/navigationService';

const getAppStore = (store) => store.app;
const getTokenStore = (store) => store.token;
const getEventStore = (store) => store.events;

export function* getResources() {
  try {
    const { backendUrl, token } = yield select(getTokenStore);
    const resources = yield call(API.getData, `${backendUrl}/api/resource`, token);
    yield put({
      type: GET_RESOURCES_SUCCEEDED,
      payload: {
        resources,
      },
    });
  } catch (error) {
    yield delay(2000);
    yield put({
      type: GET_RESOURCES_FAILED,
    });
    console.log(error); // eslint-disable-line
  }
}

export function* addMeeting(action) {
  try {
    const { backendUrl, token } = yield select(getTokenStore);
    const formData = new FormData();
    formData.append('summary', 'Ad hoc meeting');
    formData.append('start_time', `${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    formData.append('event_length', action.payload.minutes);
    const appStore = yield select(getAppStore);
    const resourceId = appStore.selectedResource.resource_id;
    yield call(API.postData, `${backendUrl}/api/event/${resourceId}`, formData);
    yield call(API.getData, `${backendUrl}/api/event/refresh/${resourceId}`, token);
    yield put({
      type: CREATE_MEETING_SUCCEEDED,
    });
  } catch (error) {
    yield delay(2000);
    yield put({
      type: CREATE_MEETING_FAILED,
    });
    console.log(error); // eslint-disable-line
  }
}

export function* restoreAfterCrash() {
  try {
    const appStore = yield select(getAppStore);
    const { backendUrl } = yield select(getTokenStore);
    socketConnection.createConnection(`${backendUrl}:3000`);
    const socket = socketConnection.getSocket();
    if (appStore.selectedResource) {
      const resourceId = appStore.selectedResource.resource_id;
      socket.emit('join', `ws-${resourceId}`);
      socket.emit('refresh', `${resourceId}`);
      NavigationService.navigate('Room');
    } else {
      yield put({ type: SHOW_RESOURCES });
      NavigationService.navigate('Home');
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

export function* cancelMeeting() {
  try {
    const appStore = yield select(getAppStore);
    const { backendUrl, token } = yield select(getTokenStore);
    const eventsStore = yield select(getEventStore);
    const resourceId = appStore.selectedResource.resource_id;
    const eventId = eventsStore.events[0].id;
    yield call(API.getData, `${backendUrl}/api/event/close/${resourceId}/${eventId}`, token);
    yield put({
      type: CANCEL_MEETING_SUCCEEDED,
    });
  } catch (error) {
    yield delay(2000);
    yield put({
      type: CANCEL_MEETING_FAILED,
    });
    console.log(error); // eslint-disable-line
  }
}

export function* confirmMeeting() {
  try {
    const appStore = yield select(getAppStore);
    const { backendUrl, token } = yield select(getTokenStore);
    const eventsStore = yield select(getEventStore);
    const resourceId = appStore.selectedResource.resource_id;
    const eventId = eventsStore.events[0].id;
    yield call(API.getData, `${backendUrl}/api/event/confirm/${resourceId}/${eventId}`, token);
    yield put({
      type: CONFIRM_MEETING_SUCCEEDED,
    });
    NavigationService.navigate('Room');
  } catch (error) {
    yield delay(2000);
    yield put({
      type: CONFIRM_MEETING_FAILED,
    });
    console.log(error); // eslint-disable-line
  }
}

export function* saveConfiguration(action) {
  try {
    const { token, backendUrl } = action.payload;
    yield call(API.getData, `${backendUrl}/api/resource`, token, token);
    yield put({ type: 'SET_WEBSOCKET' });
    NavigationService.navigate('Home');
  } catch (error) {
    Alert.alert(
      'Network Error',
      'There is something wrong with the server or the connection details are incorrect',
    );
    console.log(error); // eslint-disable-line
  }
}

export const appSagas = [
  takeEvery(RESTORE_AFTER_CRASH, restoreAfterCrash),
  takeEvery(GET_RESOURCES_REQUESTED, getResources),
  takeEvery(CREATE_MEETING_REQUESTED, addMeeting),
  takeEvery(CANCEL_MEETING_REQUESTED, cancelMeeting),
  takeEvery(CONFIRM_MEETING_REQUESTED, confirmMeeting),
  takeEvery(SAVE_CONFIGURATION, saveConfiguration),
];
