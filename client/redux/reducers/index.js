import { combineReducers } from 'redux';

import { contactReducer } from './contact';

import {
  userRegisterReducer,
  userActivateAccountReducer,
  authLoginReducer,
  resendActivationEmailReducer,
  sendResetPasswordEmailReducer,
  resetPasswordReducer,
} from './auth';

import {
  userProfileReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userDetailReducer,
  userChangeTypeReducer,
} from './user';

import {
  orderListReducer,
  orderDetailReducer,
  orderUpdateStatusReducer,
} from './order';

import {
  currencyListReducer,
  currencyCreateReducer,
  currencyDeleteReducer,
  currencyDetailReducer,
  currencyUpdateReducer,
  currencyMakePrincipalReducer,
  currencyUnMakePrincipalReducer,
} from './currency';

import {
  categoryListReducer,
  categoryCreateReducer,
  categoryDetailReducer,
  categoryUpdateReducer,
} from './category';

const reducers = combineReducers({
  contact: contactReducer,
  userRegister: userRegisterReducer,
  userActivateAccount: userActivateAccountReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetail: userDetailReducer,
  userChangeType: userChangeTypeReducer,
  authLogin: authLoginReducer,
  resendActivationEmail: resendActivationEmailReducer,
  sendResetPasswordEmail: sendResetPasswordEmailReducer,
  resetPassword: resetPasswordReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,
  orderUpdateStatus: orderUpdateStatusReducer,
  currencyList: currencyListReducer,
  currencyCreate: currencyCreateReducer,
  currencyDelete: currencyDeleteReducer,
  currencyDetail: currencyDetailReducer,
  currencyUpdate: currencyUpdateReducer,
  currencyMakePrincipal: currencyMakePrincipalReducer,
  currencyUnMakePrincipal: currencyUnMakePrincipalReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDetail: categoryDetailReducer,
  categoryUpdate: categoryUpdateReducer,
});

export default reducers;
