import { cloneDeep } from 'lodash';

import {
  GET_CART,
  CLEAR_CART,
  LOG_ERROR,
  CLEAR_ERROR,
  ADD_TO_CART,
  REMOVE_TO_CART,
  GET_TOTAL_CART,
  GET_TOTAL_ITEM_IN_CART,
} from '../constants/cart';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cartItems: state.cartItems,
      };
    case ADD_TO_CART:
      const product = action.payload;
      // const cart = [...state.cartItems];

      const existingProduct = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      // if product exists
      if (existingProduct) {
        // if variantId exists in both product and existingProduct
        // and product.variantId === existingProduct.variantId
        if (
          existingProduct.variantId &&
          product.variantId &&
          existingProduct.variantId === product.variantId
        ) {
          existingProduct.qty += product.qty;
          state.cartItems.map((item) =>
            item.key === existingProduct.key ? existingProduct : item
          );
        }
        // if variantId exists in both product and existingProduct
        // and product.variantId !== existingProduct.variantId
        else if (
          existingProduct.variantId &&
          product.variantId &&
          existingProduct.variantId !== product.variantId
        ) {
          state.cartItems = [...state.cartItems, product];
        }
        // if variantId doesn't exist existingProduct
        else if (!existingProduct.variantId) {
          existingProduct.qty += product.qty;
          state.cartItems.map((item) =>
            item.key === existingProduct.key ? existingProduct : item
          );
        }
      } else {
        // if product doesn't exists
        state.cartItems = [...state.cartItems, product];
      }

      // add cart to localStorage
      localStorage.setItem('tk_cart', JSON.stringify(state.cartItems));

      // return state
      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case REMOVE_TO_CART:
      const cartItem = [...state.cartItems];
      cartItem = cartItem.filter((item) => item.key !== action.payload);
      localStorage.set('tk_cart', JSON.stringify(cartItem));
      return {
        ...state,
        cart: cartItem,
      };

    case GET_TOTAL_CART:
      return {
        ...state,
        cartTotal: state.cartItems.reduce(
          (acc, curr) => acc + curr.qty * curr.price,
          0
        ),
      };

    case GET_TOTAL_ITEM_IN_CART:
      return {
        ...state,
        cartTotal: state.cartItems.reduce((acc, curr) => acc + curr.qty, 0),
      };

    case LOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        cart: [],
      };
    default:
      return state;
  }
};
