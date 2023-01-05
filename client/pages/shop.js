import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Products from '../components/products';
import Paginate from '../components/utilities/Paginate';
import { listCategoriesHandler } from '../redux/actions/category';
import { getPrincipalCurrencyHandler } from '../redux/actions/currency';
import {
  listProductsHandler,
  listProductsWithCategoryHandler,
  resetNotifications,
} from '../redux/actions/product';
import { getAmountInCurrency } from '../utils/number';

const Shop = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState();

  const { products, error } = useSelector((state) => state.productList);
  const { categories, error: errorCategories } = useSelector(
    (state) => state.categoryList
  );
  const { currency, error: errorCurrency } = useSelector(
    (state) => state.currencyPrincipal
  );

  useEffect(() => {
    if (error || errorCategories || errorCurrency) {
      toast(error || errorCategories || errorCurrency);
      dispatch(resetNotifications());
    }
  }, [error, errorCategories, errorCurrency, dispatch]);

  function paginateHandler(page) {
    if (categoryId) {
      router.push(`/shop?categoryId=${categoryId}&page=${page}`);
    } else {
      router.push(`/shop?page=${page}`);
    }
  }

  function chooseCategoryHandler(category) {
    setCategoryId(category);
    if (category) {
      router.push(`/shop?categoryId=${categoryId}`);
    } else {
      router.push('/shop');
    }
  }

  return <Layout title='Boutique'></Layout>;
};

export default Shop;
