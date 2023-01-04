import axios from 'axios';

import {
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  RESET_NOTIFICATIONS,
  ACTIVATE_ACCOUNT_REQUEST,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  RESEND_VALIDATION_EMAIL_REQUEST,
  RESEND_VALIDATION_EMAIL_SUCCESS,
  RESEND_VALIDATION_EMAIL_FAILED,
  SEND_RESET_PASSWORD_EMAIL_REQUEST,
  SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../constants/auth';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const registerUserHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${SERVER_API}/auth/register`,
      options,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// Activate Account action
export const activateAccountHandler = (token) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATE_ACCOUNT_REQUEST,
    });

    await axios.get(`${SERVER_API}/auth/activeaccount/${token}`);

    dispatch({
      type: ACTIVATE_ACCOUNT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// login action
export const loginHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`${SERVER_API}/auth/login`, options, config);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// resend activation email action
export const resendActivationEMailHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_VALIDATION_EMAIL_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${SERVER_API}/auth/resendemail`,
      options,
      config
    );

    dispatch({
      type: RESEND_VALIDATION_EMAIL_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: RESEND_VALIDATION_EMAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// send reset password email action
export const sendResetPasswordEMailHandler = (options) => async (dispatch) => {
  try {
    dispatch({ type: SEND_RESET_PASSWORD_EMAIL_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${SERVER_API}/auth/resetpassword`,
      options,
      config
    );

    dispatch({
      type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: SEND_RESET_PASSWORD_EMAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// reset password email action
export const resetPasswordHandler = (token, options) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${SERVER_API}/auth/resetpassword/${token}`,
      options,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// log out user handler
export const logoutHandler = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    const config = {
      withCredentials: true,
    };

    await axios.post(`${SERVER_API}/auth/logout`, options, config);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED,
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
