import { combineReducers } from 'redux';

import { contactReducer } from './contact';

import {
  userRegisterReducer,
  userActivateAccountReducer,
  authLoginReducer,
  resendActivationEmailReducer,
  sendResetPasswordEmailReducer,
  resetPasswordReducer,
  logoutReducer,
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
  orderCreateAdminReducer,
} from './order';

import {
  currencyListReducer,
  currencyCreateReducer,
  currencyDeleteReducer,
  currencyDetailReducer,
  currencyUpdateReducer,
  currencyMakePrincipalReducer,
  currencyUnMakePrincipalReducer,
  currencyPrincipalReducer,
} from './currency';

import {
  categoryListReducer,
  categoryCreateReducer,
  categoryDetailReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from './category';

import {
  productListReducer,
  productCreateReducer,
  productDetailReducer,
  productUpdateReducer,
  productDeleteReducer,
  productVariantListReducer,
  productVariantCreateReducer,
  productVariantDeleteReducer,
  productVariantDetailReducer,
  productVariantUpdateReducer,
  productPhotoListReducer,
  productPhotoCreateReducer,
  productPhotoDeleteReducer,
  productRelatedListReducer,
  productCarouselListReducer,
} from './product';

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
  logout: logoutReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,
  orderUpdateStatus: orderUpdateStatusReducer,
  orderCreateAdmin: orderCreateAdminReducer,
  currencyList: currencyListReducer,
  currencyCreate: currencyCreateReducer,
  currencyDelete: currencyDeleteReducer,
  currencyDetail: currencyDetailReducer,
  currencyUpdate: currencyUpdateReducer,
  currencyMakePrincipal: currencyMakePrincipalReducer,
  currencyUnMakePrincipal: currencyUnMakePrincipalReducer,
  currencyPrincipal: currencyPrincipalReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDetail: categoryDetailReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  productList: productListReducer,
  productCarouselList: productCarouselListReducer,
  productCreate: productCreateReducer,
  productDetail: productDetailReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productVariantList: productVariantListReducer,
  productVariantCreate: productVariantCreateReducer,
  productVariantDelete: productVariantDeleteReducer,
  productVariantDetail: productVariantDetailReducer,
  productVariantUpdate: productVariantUpdateReducer,
  productPhotoList: productPhotoListReducer,
  productPhotoCreate: productPhotoCreateReducer,
  productPhotoDelete: productPhotoDeleteReducer,
  productRelatedList: productRelatedListReducer,
});

export default reducers;
