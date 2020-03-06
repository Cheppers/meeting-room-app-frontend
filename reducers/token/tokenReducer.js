import {
  CHANGE_INPUT_FIELD,
} from '../../consts/actionTypes';
import initialState from './initialState';

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT_FIELD: {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    }

    default:
      return state;
  }
};

export default tokenReducer;
