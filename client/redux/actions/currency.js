import axios from 'axios';

import {
  CURRENCY_CREATE_FAILED,
  CURRENCY_CREATE_REQUEST,
  CURRENCY_CREATE_SUCCESS,
  CURRENCY_DELETE_FAILED,
  CURRENCY_DELETE_REQUEST,
  CURRENCY_DELETE_SUCCESS,
  CURRENCY_DETAIL_FAILED,
  CURRENCY_DETAIL_REQUEST,
  CURRENCY_DETAIL_SUCCESS,
  CURRENCY_LIST_FAILED,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
  CURRENCY_MAKE_PRINCIPAL_FAILED,
  CURRENCY_MAKE_PRINCIPAL_REQUEST,
  CURRENCY_MAKE_PRINCIPAL_SUCCESS,
  CURRENCY_PRINCIPAL_FAILED,
  CURRENCY_PRINCIPAL_REQUEST,
  CURRENCY_PRINCIPAL_SUCCESS,
  CURRENCY_UNMAKE_PRINCIPAL_FAILED,
  CURRENCY_UNMAKE_PRINCIPAL_REQUEST,
  CURRENCY_UNMAKE_PRINCIPAL_SUCCESS,
  CURRENCY_UPDATE_FAILED,
  CURRENCY_UPDATE_REQUEST,
  CURRENCY_UPDATE_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/currency';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// list currencies action
export const listCurrenciesHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CURRENCY_LIST_REQUEST });

      let link = `${SERVER_API}/currencies?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: CURRENCY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CURRENCY_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// create currency action
export const createCurrencyHandler = (currency) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_CREATE_REQUEST });

    await axios.post(`${SERVER_API}/currencies`, currency, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: CURRENCY_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_CREATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// delete currency
export const deleteCurrencyHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_DELETE_REQUEST });

    const { data } = await axios.delete(`${SERVER_API}/currencies/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: CURRENCY_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DELETE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get currency
export const getCurrencyHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/currencies/${id}`);

    dispatch({
      type: CURRENCY_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update currency
export const updateCurrencyHandler = (id, currency) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_UPDATE_REQUEST });

    const { data } = await axios.put(
      `${SERVER_API}/currencies/${id}`,
      currency,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: CURRENCY_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_UPDATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// make currency principal
export const makeCurrencyPrincipalHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_MAKE_PRINCIPAL_REQUEST });

    await axios.patch(
      `${SERVER_API}/currencies/${id}/make-principal`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: CURRENCY_MAKE_PRINCIPAL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_MAKE_PRINCIPAL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// unmake currency principal
export const unmakeCurrencyPrincipalHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_UNMAKE_PRINCIPAL_REQUEST });

    await axios.patch(
      `${SERVER_API}/currencies/${id}/unmake-principal`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: CURRENCY_UNMAKE_PRINCIPAL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_UNMAKE_PRINCIPAL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get currency principal
export const getPrincipalCurrencyHandler = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_PRINCIPAL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/currencies/principal`);

    dispatch({
      type: CURRENCY_PRINCIPAL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_PRINCIPAL_FAILED,
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
