import axios from 'axios';

import {
  STRIPE_INTENT_FAILED,
  STRIPE_INTENT_REQUEST,
  STRIPE_INTENT_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/stripe';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// get stripe intent action
export const getStripeIntentHandler = (amount) => async (dispatch) => {
  try {
    dispatch({ type: STRIPE_INTENT_REQUEST });

    const { data } = await axios.post(
      `${SERVER_API}/stripe`,
      { amount },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: STRIPE_INTENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: STRIPE_INTENT_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
