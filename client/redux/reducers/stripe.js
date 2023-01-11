import {
  STRIPE_INTENT_FAILED,
  STRIPE_INTENT_REQUEST,
  STRIPE_INTENT_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/stripe';

// process stripe reducer
export const stripeIntentReducer = (state = {}, action) => {
  switch (action.type) {
    case STRIPE_INTENT_REQUEST:
      return {
        loading: true,
      };
    case STRIPE_INTENT_SUCCESS:
      return {
        loading: false,
        success: true,
        clientSecret: action.payload,
      };
    case STRIPE_INTENT_FAILED:
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
