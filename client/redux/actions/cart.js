import axios from 'axios';

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

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const addToCart = (productId, variantId, qty) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_API}/products/${productId}`);
    const product = data.data;

    const cartProduct = {
      key: new Date().getTime(),
      productId,
      variantId,
      name: product.name,
      price: product.price
        ? product.price
        : product.variant.find((v) => v._id === variantId).price,
      photo: product.photoPrincipal
        ? product.photoPrincipal.url
        : product.variant.find((v) => v._id === variantId).photoPrincipal.url,
      qty: parseInt(qty),
      size: product.size
        ? product.size
        : product.variant.find((v) => v._id === variantId).size,
      color: product.color
        ? product.color
        : product.variant.find((v) => v._id === variantId).color,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: cartProduct,
    });
  } catch (error) {
    dispatch({
      type: LOG_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
