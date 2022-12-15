import {
  CONTACT_FAILED,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_RESET,
  RESET_NOTIFICATIONS,
} from '../constants/contact';

export const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return {
        loading: true,
      };
    case CONTACT_SUCCESS:
      return {
        loading: false,
        success: true,
        msg: action.payload,
      };
    case CONTACT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTACT_RESET:
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};
