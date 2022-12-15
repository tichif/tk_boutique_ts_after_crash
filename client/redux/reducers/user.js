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
  USER_DETAIL_RESET,
  USER_CHANGE_TYPE_REQUEST,
  USER_CHANGE_TYPE_SUCCESS,
  USER_CHANGE_TYPE_FAILED,
} from '../constants/user';

// user profile  reducer
export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_PROFILE_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// user profile  reducer
export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_PROFILE_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// user list  reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        pagination: action.payload.pagination,
        users: action.payload.data,
      };
    case USER_LIST_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// user delete reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

// user detail reducer
export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };
    case USER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_DETAIL_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
    case USER_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

// user change type reducer
export const userChangeTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_TYPE_REQUEST:
      return { loading: true };
    case USER_CHANGE_TYPE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_CHANGE_TYPE_FAILED:
      return { loading: false, error: action.payload };
    case RESET_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};
