import {
  SHIPPING_DETAIL_FAILED,
  SHIPPING_DETAIL_REQUEST,
  SHIPPING_DETAIL_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/shipping';

// shipping detail
export const shippingDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case SHIPPING_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        infos: action.payload,
      };
    case SHIPPING_DETAIL_FAILED:
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
