import {
  RESOURCES_GET_EVENTS_REQUESTED, RESOURCES_GET_EVENTS_SUCCEEDED,
  RESOURCES_GET_EVENTS_FAILED, STORE_EVENTS,
  UPDATE_EVENTS, SHOW_RESOURCES,
} from '../../consts/actionTypes';
import initialState from './initialState';

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESOURCES_GET_EVENTS_REQUESTED:
    case RESOURCES_GET_EVENTS_FAILED:
    case SHOW_RESOURCES:
      return initialState;

    case RESOURCES_GET_EVENTS_SUCCEEDED:
    case UPDATE_EVENTS:
      return {
        ...state,
        events: action.payload.events,
      };

    case STORE_EVENTS: {
      const { events, isOccupied, loading } = action.payload;
      return {
        ...state,
        events,
        isOccupied,
        loading,
      };
    }

    default:
      return state;
  }
};

export default eventsReducer;
