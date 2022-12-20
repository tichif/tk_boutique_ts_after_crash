import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_RESET,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_VARIANT_CREATE_FAILED,
  PRODUCT_VARIANT_CREATE_REQUEST,
  PRODUCT_VARIANT_CREATE_RESET,
  PRODUCT_VARIANT_CREATE_SUCCESS,
  PRODUCT_VARIANT_LIST_FAILED,
  PRODUCT_VARIANT_LIST_REQUEST,
  PRODUCT_VARIANT_LIST_SUCCESS,
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

// product update
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Article modifié avec succès',
      };
    case PRODUCT_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// product detail
export const productDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case PRODUCT_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

// product delete
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: 'Article supprimé avec succès',
      };
    case PRODUCT_DELETE_FAILED:
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

// product variant list
export const productVariantListReducer = (state = { variants: [] }, action) => {
  switch (action.type) {
    case PRODUCT_VARIANT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_VARIANT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        variants: action.payload,
      };
    case PRODUCT_VARIANT_LIST_FAILED:
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

// product variant create
export const productVariantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_VARIANT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_VARIANT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_VARIANT_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_NOTIFICATIONS:
    case PRODUCT_VARIANT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
