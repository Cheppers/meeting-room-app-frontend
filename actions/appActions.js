import {
  GET_RESOURCES_REQUESTED,
  SHOW_RESOURCES,
  SELECT_RESOURCE,
  CREATE_MEETING_REQUESTED,
  TOUCH_EVENT,
  CANCEL_MEETING_REQUESTED,
  CONFIRM_MEETING_REQUESTED,
  BASE_MODAL_OPEN,
  CANCEL_MODAL_OPEN,
  CHANGE_INPUT_FIELD,
  SAVE_CONFIGURATION,
  CANCEL_SWIPE_TIMER, START_SWIPE_TIMER,
} from '../consts/actionTypes';

export const showResources = () => ({
  type: SHOW_RESOURCES,
});

export const getResources = () => ({
  type: GET_RESOURCES_REQUESTED,
});

export const selectResource = (resource) => ({
  type: SELECT_RESOURCE,
  payload: {
    resource,
  },
});

export const reserveAdhocMeeting = (minutes) => ({
  type: CREATE_MEETING_REQUESTED,
  payload: {
    minutes,
  },
});

export const touch = () => ({
  type: TOUCH_EVENT,
});

export const cancelMeeting = () => ({
  type: CANCEL_MEETING_REQUESTED,
});

export const confirmMeeting = () => ({
  type: CONFIRM_MEETING_REQUESTED,
});

export const openBaseModal = () => ({
  type: BASE_MODAL_OPEN,
});

export const closeBaseModal = () => ({
  type: CANCEL_MODAL_OPEN,
});

export const changeInputField = (field, value) => ({
  type: CHANGE_INPUT_FIELD,
  payload: {
    field,
    value,
  },
});

export const saveConfiguration = (backendUrl, token) => ({
  type: SAVE_CONFIGURATION,
  payload: {
    backendUrl,
    token,
  },
});

export const cancelSwipe = () => ({
  type: CANCEL_SWIPE_TIMER,
});

export const startSwipe = () => ({
  type: START_SWIPE_TIMER,
});
