import {
  MONCASH_CREATE_FAILED,
  MONCASH_CREATE_REQUEST,
  MONCASH_CREATE_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/moncash';

// process moncash payment reducer
export const moncashCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MONCASH_CREATE_REQUEST:
      return {
        loading: true,
      };
    case MONCASH_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        url: action.payload,
      };
    case MONCASH_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};
