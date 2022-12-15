import axios from 'axios';

import {
  ORDERS_LIST_FAILED,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDER_DETAIL_FAILED,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_UPDATE_STATUS_FAILED,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/order';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// list my orders action
export const listMyOrdersHandler =
  (query = '', page = '', userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDERS_LIST_REQUEST });

      let link = `${SERVER_API}/orders/user/${userId}?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: ORDERS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDERS_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// order details action
export const getOrderHandler = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/orders/${orderId}`, {
      withCredentials: true,
    });

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// list all orders action
export const listOrdersHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDERS_LIST_REQUEST });

      let link = `${SERVER_API}/orders?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: ORDERS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDERS_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// order details action
export const getOrderForAdminHandler = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/orders/admin/${orderId}`, {
      withCredentials: true,
    });

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update order status delivery action
export const updateOrderStatusHandler = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });

    await axios.patch(
      `${SERVER_API}/orders/${orderId}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ORDER_UPDATE_STATUS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_STATUS_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// list my orders action
export const listAllOrdersForUserAdminHandler =
  (query = '', page = '', userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDERS_LIST_REQUEST });

      let link = `${SERVER_API}/orders/user/${userId}/admin?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: ORDERS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDERS_LIST_FAILED,
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
