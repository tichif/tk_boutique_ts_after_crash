import axios from 'axios';

import {
  PRODUCT_AVAILABILITY_FAILED,
  PRODUCT_AVAILABILITY_REQUEST,
  PRODUCT_AVAILABILITY_SUCCESS,
  PRODUCT_CAROUSEL_LIST_FAILED,
  PRODUCT_CAROUSEL_LIST_SUCCESS,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_PHOTO_CREATE_FAILED,
  PRODUCT_PHOTO_CREATE_REQUEST,
  PRODUCT_PHOTO_CREATE_SUCCESS,
  PRODUCT_PHOTO_DELETE_FAILED,
  PRODUCT_PHOTO_DELETE_REQUEST,
  PRODUCT_PHOTO_DELETE_SUCCESS,
  PRODUCT_PHOTO_LIST_FAILED,
  PRODUCT_PHOTO_LIST_REQUEST,
  PRODUCT_PHOTO_LIST_SUCCESS,
  PRODUCT_RELATED_LIST_FAILED,
  PRODUCT_RELATED_LIST_REQUEST,
  PRODUCT_RELATED_LIST_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_VARIANT_CREATE_FAILED,
  PRODUCT_VARIANT_CREATE_REQUEST,
  PRODUCT_VARIANT_CREATE_SUCCESS,
  PRODUCT_VARIANT_DELETE_FAILED,
  PRODUCT_VARIANT_DELETE_REQUEST,
  PRODUCT_VARIANT_DELETE_SUCCESS,
  PRODUCT_VARIANT_DETAIL_FAILED,
  PRODUCT_VARIANT_DETAIL_REQUEST,
  PRODUCT_VARIANT_DETAIL_SUCCESS,
  PRODUCT_VARIANT_LIST_FAILED,
  PRODUCT_VARIANT_LIST_REQUEST,
  PRODUCT_VARIANT_LIST_SUCCESS,
  PRODUCT_VARIANT_UPDATE_FAILED,
  PRODUCT_VARIANT_UPDATE_REQUEST,
  PRODUCT_VARIANT_UPDATE_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../constants/product';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

// list products action
export const listProductsHandler =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let link = `${SERVER_API}/products?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// list products action
export const listCarouselProductsHandler = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${SERVER_API}/products?select=name,price,slug,variant,photoPrincipal&limit=4&sort=createdAt`
    );

    dispatch({
      type: PRODUCT_CAROUSEL_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CAROUSEL_LIST_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// list products with CategoryId action
export const listProductsWithCategoryHandler =
  (query = '', page = '', categoryId) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let link = `${SERVER_API}/categories/${categoryId}/products?${query}`;

      if (page) {
        link = link.concat(`&page=${page}`);
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// create product action
export const createProductHandler = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    await axios.post(`${SERVER_API}/products`, product, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get product action
export const getProductHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/products/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get product by slug action
export const getProductBySlugHandler = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/products/get/${slug}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update product action
export const updateProductHandler = (id, product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    await axios.put(`${SERVER_API}/products/${id}`, product, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// delete product action
export const deleteProductHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`${SERVER_API}/products/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get product variant action
export const getProductVariantsHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_VARIANT_LIST_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/products/${id}/variants`, {
      withCredentials: true,
    });

    dispatch({
      type: PRODUCT_VARIANT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_VARIANT_LIST_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// create product variant action
export const createProductVariantHandler =
  (id, variant) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_VARIANT_CREATE_REQUEST });

      await axios.put(`${SERVER_API}/products/${id}/variants`, variant, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: PRODUCT_VARIANT_CREATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_VARIANT_CREATE_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// delete product variant action
export const deleteProductVariantHandler =
  (id, variantId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_VARIANT_DELETE_REQUEST });

      await axios.delete(`${SERVER_API}/products/${id}/variants/${variantId}`, {
        withCredentials: true,
      });

      dispatch({
        type: PRODUCT_VARIANT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_VARIANT_DELETE_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// get product variant action
export const getProductVariantHandler = (id, variantId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_VARIANT_DETAIL_REQUEST });

    const { data } = await axios.get(
      `${SERVER_API}/products/${id}/variants/${variantId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: PRODUCT_VARIANT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_VARIANT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// update product variant action
export const updateProductVariantHandler =
  (id, variantId, variant) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_VARIANT_UPDATE_REQUEST });

      await axios.put(
        `${SERVER_API}/products/${id}/variants/${variantId}`,
        variant,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: PRODUCT_VARIANT_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_VARIANT_UPDATE_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// get product photo action
export const getProductPhotosHandler = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PHOTO_LIST_REQUEST });

    const { data } = await axios.get(`${SERVER_API}/products/${id}/photos`, {
      withCredentials: true,
    });

    dispatch({
      type: PRODUCT_PHOTO_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PHOTO_LIST_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// add product photo action
export const addProductPhotoHandler = (id, photo) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PHOTO_CREATE_REQUEST });

    await axios.put(`${SERVER_API}/products/${id}/photos`, photo, {
      withCredentials: true,
    });

    dispatch({
      type: PRODUCT_PHOTO_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PHOTO_CREATE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// delete product photo action
export const deleteProductPhotoHandler = (id, photoId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PHOTO_DELETE_REQUEST });

    await axios.delete(
      `${SERVER_API}/products/${id}/photos?public_id=${photoId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: PRODUCT_PHOTO_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PHOTO_DELETE_FAILED,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// get product variant photo action
export const getProductVariantPhotosHandler =
  (productId, variantId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_PHOTO_LIST_REQUEST });

      const { data } = await axios.get(
        `${SERVER_API}/products/${productId}/variants/${variantId}/photos`,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: PRODUCT_PHOTO_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_PHOTO_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// add product variant photo action
export const addProductVariantPhotoHandler =
  (productId, variantId, photo) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_PHOTO_CREATE_REQUEST });

      await axios.put(
        `${SERVER_API}/products/${productId}/variants/${variantId}/photos`,
        photo,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: PRODUCT_PHOTO_CREATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_PHOTO_CREATE_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// delete product variant photo action
export const deleteProductVariantPhotoHandler =
  (productId, variantId, photoId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_PHOTO_DELETE_REQUEST });

      await axios.delete(
        `${SERVER_API}/products/${productId}/variants/${variantId}/photos?public_id=${photoId}`,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: PRODUCT_PHOTO_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_PHOTO_DELETE_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// get related products action
export const getRelatedProductsHandler =
  (id, categoryId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_RELATED_LIST_REQUEST });

      const { data } = await axios.get(
        `${SERVER_API}/products/${id}/${categoryId}/related`,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: PRODUCT_RELATED_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_RELATED_LIST_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// check products availability action
export const checkProductsAvailabilityHandler =
  (products) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_AVAILABILITY_REQUEST });

      await axios.post(`${SERVER_API}/products/products-available`, products, {
        withCredentials: true,
      });

      dispatch({
        type: PRODUCT_AVAILABILITY_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_AVAILABILITY_FAILED,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  };

// reset notification
export const resetNotifications = () => (dispatch) => {
  dispatch({
    type: RESET_NOTIFICATIONS,
  });
};
