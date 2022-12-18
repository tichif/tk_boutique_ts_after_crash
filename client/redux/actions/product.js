import axios from 'axios';

import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/product';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// list products action
export const listProductsHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let link = `${SERVER_API}/products?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// list products with CategoryId action
export const listProductsWithCategoryHandler =
  (query = '', page = '', categoryId) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let link = `${SERVER_API}/categories/${categoryId}/products?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// create product action
export const createProductHandler = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    await axios.post(`${SERVER_API}/products`, product, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILED,
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
