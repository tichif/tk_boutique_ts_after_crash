import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const bindMiddleware = (middleware) => {
  return composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware));
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
