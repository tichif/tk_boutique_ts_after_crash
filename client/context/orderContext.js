import { createContext, useContext, useReducer } from 'react';

import {
  ADD_SHIPPING_DETAIL,
  ADD_PAYMENT_DETAIL,
  CLEAR_ORDER_INFOS,
} from '../redux/constants/order';

const OrderContext = createContext();

function OrderContextProvider({ children }) {
  const initialState = {
    shippingInfos: localStorage.getItem('tk_shippingInfos')
      ? JSON.parse(localStorage.getItem('tk_shippingInfos'))
      : undefined,
    paymentInfos: localStorage.getItem('tk_paymentInfos')
      ? JSON.parse(localStorage.getItem('tk_paymentInfos'))
      : '',
  };

  function reducer(state, action) {
    switch (action.type) {
      case ADD_SHIPPING_DETAIL:
        localStorage.setItem(
          'tk_shippingInfos',
          JSON.stringify(action.payload)
        );
        return {
          ...state,
          shippingInfos: action.payload,
        };
      case ADD_PAYMENT_DETAIL:
        localStorage.setItem('tk_paymentInfos', JSON.stringify(action.payload));
        return {
          ...state,
          paymentInfos: action.payload,
        };
      case CLEAR_ORDER_INFOS:
        localStorage.removeItem('tk_paymentInfos');
        localStorage.removeItem('tk_shippingInfos');
        return {};
      default:
        return state;
    }
  }

  function addShippingInfos(data) {
    dispatch({
      type: ADD_SHIPPING_DETAIL,
      payload: data,
    });
  }

  function addPaymentInfos(data) {
    dispatch({
      type: ADD_PAYMENT_DETAIL,
      payload: data,
    });
  }

  function clearInfos() {
    dispatch({
      type: CLEAR_ORDER_INFOS,
    });
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider
      value={{ state, addShippingInfos, addPaymentInfos, clearInfos }}
    >
      {children}
    </OrderContext.Provider>
  );
}

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderContextProvider };
