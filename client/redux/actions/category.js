import axios from 'axios';

import {
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DETAIL_FAILED,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAILED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAILED,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/category';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// list categories action
export const listCategoriesHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });

      let link = `${SERVER_API}/categories?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// create category action
export const createCategoryHandler = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    await axios.post(`${SERVER_API}/categories`, category, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// detail category action
export const getCategoryHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/categories/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update category action
export const updateCategoryHandler = (id, category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    await axios.put(`${SERVER_API}/categories/${id}`, category, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAILED,
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
