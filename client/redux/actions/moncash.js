import axios from 'axios';

import {
  MONCASH_CREATE_FAILED,
  MONCASH_CREATE_REQUEST,
  MONCASH_CREATE_SUCCESS,
  MONCASH_DETAIL_FAILED,
  MONCASH_DETAIL_REQUEST,
  MONCASH_DETAIL_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/moncash';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// process moncash payment action
export const processMoncashPaymentHandler = (amount) => async (dispatch) => {
  try {
    dispatch({ type: MONCASH_CREATE_REQUEST });

    const { data } = await axios.post(
      `${SERVER_API}/moncash`,
      { amount },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: MONCASH_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MONCASH_CREATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get moncash infos action
export const getMoncashInfosHandler = (transactionId) => async (dispatch) => {
  try {
    dispatch({ type: MONCASH_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/moncash/${transactionId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: MONCASH_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MONCASH_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// reset notification
export const resetNotifications = () => (dispatch) => {
  dispatch({
    type: RESET_NOTIFICATIONS,
  });
};
