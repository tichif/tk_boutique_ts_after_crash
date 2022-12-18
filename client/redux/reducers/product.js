import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/product';

// product list
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        pagination: action.payload.pagination,
        products: action.payload.data,
      };
    case PRODUCT_LIST_FAILED:
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

// product create
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
