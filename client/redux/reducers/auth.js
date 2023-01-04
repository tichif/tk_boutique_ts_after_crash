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

// registerUser reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case USER_REGISTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// activateAccount reducer
export const userActivateAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_ACCOUNT_REQUEST:
      return { loading: true };
    case ACTIVATE_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case ACTIVATE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// registerUser reducer
export const authLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case AUTH_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// Resend Action email reducer
export const resendActivationEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case RESEND_VALIDATION_EMAIL_REQUEST:
      return { loading: true };
    case RESEND_VALIDATION_EMAIL_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case RESEND_VALIDATION_EMAIL_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// Send reset password email reducer
export const sendResetPasswordEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_RESET_PASSWORD_EMAIL_REQUEST:
      return { loading: true };
    case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case SEND_RESET_PASSWORD_EMAIL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Send reset email reducer
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case RESET_PASSWORD_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// logout user reducer
export const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loading: true };
    case LOGOUT_SUCCESS:
      return { loading: false, success: true };
    case LOGOUT_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
