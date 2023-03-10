import {
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
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

// category list
export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        pagination: action.payload.pagination,
        categories: action.payload.data,
      };
    case CATEGORY_LIST_FAILED:
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

// category create
export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CATEGORY_CREATE_FAILED:
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

// category detail
export const categoryDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY_DETAIL_FAILED:
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

// category update
export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Cat??gorie modifi??e avec succ??s',
      };
    case CATEGORY_UPDATE_FAILED:
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

// category delete
export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Cat??gorie supprim??e avec succ??s',
      };
    case CATEGORY_DELETE_FAILED:
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
