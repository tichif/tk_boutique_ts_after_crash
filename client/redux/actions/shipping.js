import axios from 'axios';

import {
  SHIPPING_DETAIL_FAILED,
  SHIPPING_DETAIL_REQUEST,
  SHIPPING_DETAIL_SUCCESS,
} from '../constants/shipping';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// get category detail action
export const getShippingHandler = (address) => async (dispatch) => {
  try {
    dispatch({ type: SHIPPING_DETAIL_REQUEST });

    const { data } = await axios.post(`${SERVER_API}/shipping`, address, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: SHIPPING_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
