import { createContext, useReducer, useContext } from 'react';

import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  GET_CART,
  GET_TOTAL_CART,
  GET_TOTAL_ITEM_IN_CART,
} from '../redux/constants/cart';

const CartContext = createContext();

function CartContextProvider({ children }) {
  const initialState = {
    cart: [],
  };

  function reducer(state, action) {}

  const [state, action] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, action }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

export { useCart, CartContextProvider };
