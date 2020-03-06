import {
  GET_RESOURCES_REQUESTED, GET_RESOURCES_SUCCEEDED,
  GET_RESOURCES_FAILED, SELECT_RESOURCE,
  SHOW_RESOURCES, BASE_MODAL_OPEN, CANCEL_MODAL_OPEN,
  CANCEL_SWIPE_TIMER, SWIPE_BACK, START_SWIPE_TIMER,
} from '../../consts/actionTypes';
import initialState from './initialState';

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_SWIPE_TIMER:
      return {
        ...state,
        swipeBack: false,
        onSwipe: false,
      };

    case START_SWIPE_TIMER:
      return {
        ...state,
        swipeBack: false,
        onSwipe: true,
      };

    case SWIPE_BACK:
      return {
        ...state,
        swipeBack: true,
      };

    case SHOW_RESOURCES:
      return {
        ...state,
        selectedResource: null,
      };

    case GET_RESOURCES_REQUESTED:
      return {
        ...state,
        resourcesLoading: true,
      };

    case GET_RESOURCES_SUCCEEDED: {
      const { resources } = action.payload;
      return {
        ...state,
        resources: resources.map((resource) => ({
          ...resource,
          beautifiedResourceName: resource.resource_name, // TODO: replace name
        })),
        resourcesLoading: false,
      };
    }

    case GET_RESOURCES_FAILED:
      return {
        ...state,
        resourcesLoading: false,
      };

    case SELECT_RESOURCE: {
      const { resource } = action.payload;
      return {
        ...state,
        selectedResource: resource,
      };
    }

    case BASE_MODAL_OPEN:
      return {
        ...state,
        baseModalOpen: true,
      };

    case CANCEL_MODAL_OPEN:
      return {
        ...state,
        baseModalOpen: false,
      };

    default:
      return state;
  }
};


export default appReducer;
