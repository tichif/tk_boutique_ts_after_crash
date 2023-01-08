import {
  ORDERS_LIST_FAILED,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDER_CREATE_ADMIN_FAILED,
  ORDER_CREATE_ADMIN_REQUEST,
  ORDER_CREATE_ADMIN_SUCCESS,
  ORDER_DETAIL_FAILED,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_RESET,
  ORDER_DETAIL_SUCCESS,
  ORDER_UPDATE_STATUS_FAILED,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/order';

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        pagination: action.payload.pagination,
        orders: action.payload.data,
      };
    case ORDERS_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_DETAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
      return {
        error: undefined,
        loading: false,
      };
    case ORDER_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_UPDATE_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_UPDATE_STATUS_FAILED:
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

export const orderCreateAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        orderId: action.payload,
      };
    case ORDER_CREATE_ADMIN_FAILED:
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
