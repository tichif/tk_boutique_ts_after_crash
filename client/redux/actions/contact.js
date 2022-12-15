import axios from 'axios';

import {
  CONTACT_FAILED,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/contact';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const contactHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${SERVER_API}/contact`, options, config);

    dispatch({
      type: CONTACT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const resetNotifications = () => (dispatch) => {
  dispatch({
    type: RESET_NOTIFICATIONS,
  });
};
