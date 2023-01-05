import {
  CURRENCY_CREATE_FAILED,
  CURRENCY_CREATE_REQUEST,
  CURRENCY_CREATE_RESET,
  CURRENCY_CREATE_SUCCESS,
  CURRENCY_DELETE_FAILED,
  CURRENCY_DELETE_REQUEST,
  CURRENCY_DELETE_SUCCESS,
  CURRENCY_DETAIL_FAILED,
  CURRENCY_DETAIL_REQUEST,
  CURRENCY_DETAIL_RESET,
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
  CURRENCY_UPDATE_RESET,
  CURRENCY_UPDATE_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/currency';

export const currencyListReducer = (state = { currencies: [] }, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        pagination: action.payload.pagination,
        currencies: action.payload.data,
      };
    case CURRENCY_LIST_FAILED:
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

export const currencyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CURRENCY_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case CURRENCY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const currencyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case CURRENCY_DELETE_FAILED:
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

export const currencyDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        currency: action.payload,
      };
    case CURRENCY_DETAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case CURRENCY_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const currencyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Devise modifiée avec succès',
      };
    case CURRENCY_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case CURRENCY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const currencyMakePrincipalReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_MAKE_PRINCIPAL_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_MAKE_PRINCIPAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CURRENCY_MAKE_PRINCIPAL_FAILED:
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

export const currencyUnMakePrincipalReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_UNMAKE_PRINCIPAL_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_UNMAKE_PRINCIPAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CURRENCY_UNMAKE_PRINCIPAL_FAILED:
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

export const currencyPrincipalReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_PRINCIPAL_REQUEST:
      return {
        loading: true,
      };
    case CURRENCY_PRINCIPAL_SUCCESS:
      return {
        loading: false,
        success: true,
        currency: action.payload,
      };
    case CURRENCY_PRINCIPAL_FAILED:
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
