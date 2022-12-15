import axios from 'axios';

import {
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  RESET_NOTIFICATIONS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILED,
  USER_CHANGE_TYPE_REQUEST,
  USER_CHANGE_TYPE_SUCCESS,
  USER_CHANGE_TYPE_FAILED,
} from '../constants/user';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// load user profile
export const loadUserProfileHandler = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${SERVER_API}/profile/myprofile`, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update user profile
export const updateUserProfileHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(`${SERVER_API}/profile/update`, options, config);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// list users action
export const listUsersHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });

      let link = `${SERVER_API}/users?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// delete user action
export const deleteUserHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    await axios.delete(`${SERVER_API}/users/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get user action
export const getUserHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/users/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// change user type action
export const changeUserTypeHandler = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_TYPE_REQUEST });

    await axios.patch(
      `${SERVER_API}/users/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: USER_CHANGE_TYPE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_CHANGE_TYPE_FAILED,
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
