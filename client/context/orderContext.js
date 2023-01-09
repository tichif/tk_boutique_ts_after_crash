import { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext();

function OrderContextProvider({ children }) {
  return <OrderContext.Provider>{children}</OrderContext.Provider>;
}

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderContextProvider };
