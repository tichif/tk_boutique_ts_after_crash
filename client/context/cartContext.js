import axios from 'axios';
import { createContext, useReducer, useContext } from 'react';

import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  GET_CART,
  GET_TOTAL_CART,
  GET_TOTAL_ITEM_IN_CART,
  LOG_ERROR,
  CLEAR_ERROR,
  CLEAR_CART,
} from '../redux/constants/cart';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

const CartContext = createContext();

function CartContextProvider({ children }) {
  const initialState = {
    cart: localStorage.getItem('tk_cart')
      ? JSON.parse(localStorage.getItem('tk_cart'))
      : [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case GET_CART:
        return {
          ...state,
          cart: state.cart,
        };
      case ADD_TO_CART:
        const product = action.payload;
        console.log(product);
        const cartCopy = [...state.cart];
        const existingProduct = cartCopy.find(
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
            cartCopy.map((item) =>
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
            cartCopy = [...cartCopy, product];
          }
          // if variantId doesn't exist existingProduct
          else if (!existingProduct.variantId) {
            existingProduct.qty += product.qty;
            cartCopy.map((item) =>
              item.key === existingProduct.key ? existingProduct : item
            );
          }
        } else {
          // if product doesn't exists
          cartCopy = [...cartCopy, product];
        }

        // add cart to localStorage
        localStorage.set('tk_cart', JSON.stringify(cartCopy));

        // return state
        return {
          ...state,
          cart: [...cartCopy],
        };

      case REMOVE_TO_CART:
        const cartItem = [...state.cart];
        cartItem = cartItem.filter((item) => item.key !== action.payload);
        localStorage.set('tk_cart', JSON.stringify(cartItem));
        return {
          ...state,
          cart: cartItem,
        };

      case GET_TOTAL_CART:
        return {
          ...state,
          cartTotal: state.cart.reduce(
            (acc, curr) => acc + curr.qty * curr.price,
            0
          ),
        };

      case GET_TOTAL_ITEM_IN_CART:
        return {
          ...state,
          cartTotal: state.cart.reduce((acc, curr) => acc + curr.qty, 0),
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
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  async function addToCart(productId, variantId, qty) {
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
  }

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

export { useCart, CartContextProvider };
