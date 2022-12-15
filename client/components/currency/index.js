import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listCurrenciesHandler,
  deleteCurrencyHandler,
  resetNotifications,
  makeCurrencyPrincipalHandler,
  unmakeCurrencyPrincipalHandler,
} from '../../redux/actions/currency';
import { convertMultipleWords } from '../../utils/string';
import Paginate from '../utilities/Paginate';

const CurrencyList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, pagination, currencies } = useSelector(
    (state) => state.currencyList
  );
  const {
    loading: loadingMakePrincipal,
    success: successMakePrincipal,
    error: errorMakePrincipal,
  } = useSelector((state) => state.currencyMakePrincipal);
  const {
    loading: loadingUnMakePrincipal,
    success: successUnMakePrincipal,
    error: errorUnMakePrincipal,
  } = useSelector((state) => state.currencyUnMakePrincipal);

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
    message,
  } = useSelector((state) => state.currencyDelete);

  useEffect(() => {
    dispatch(
      listCurrenciesHandler(
        'select=name,symbol,amount,isPrincipal&limit=10',
        ''
      )
    );
  }, [dispatch, successMakePrincipal, successUnMakePrincipal]);

  useEffect(() => {
    if (error || errorDelete || errorMakePrincipal || errorUnMakePrincipal) {
      toast.error(
        error || errorDelete || errorMakePrincipal || errorUnMakePrincipal
      );
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorDelete, errorMakePrincipal, errorUnMakePrincipal]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetNotifications());
      dispatch(
        listCurrenciesHandler(
          'select=name,symbol,amount,isPrincipal&limit=10',
          ''
        )
      );
    }
  }, [success, dispatch]);

  if (
    loading ||
    loadingDelete ||
    loadingMakePrincipal ||
    loadingUnMakePrincipal
  ) {
    return <Loader />;
  }

  function clickHandler(currencyId) {
    router.push(`/admin/currencies/${currencyId}/edit`);
  }

  // pagination handler
  function receiveDataHandler(page) {
    dispatch(
      listCurrenciesHandler(
        'select=name,symbol,amount,isPrincipal&limit=10',
        page
      )
    );
  }

  // disable or enable currency
  function buttonClickHandler(currency) {
    if (currency.isPrincipal) {
      if (
        window.confirm(
          'Etes vous sur(e) de vouloir retirer cette devise comme devise principale ? Cette action peut occasionner un dysfonctionnement du site.'
        )
      ) {
        dispatch(unmakeCurrencyPrincipalHandler(currency._id));
      }
    } else {
      if (
        window.confirm(
          'Etes vous sur(e) de vouloir mettre cette devise comme devise principale ? Cette action peut occasionner un dysfonctionnement du site.'
        )
      ) {
        dispatch(makeCurrencyPrincipalHandler(currency._id));
      }
    }
  }

  // delete currency
  function deleteHandler(id) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette devise ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      dispatch(deleteCurrencyHandler(id));
    }
  }

  return (
    <>
      {currencies && currencies.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore ajouté de devises.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
              <th>SYMBOLE</th>
              <th>VALEUR</th>
              <th>PRINCIPALE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currencies &&
              currencies.map((currency) => (
                <tr key={currency._id}>
                  <td>{currency._id}</td>
                  <td>{convertMultipleWords(currency.name)}</td>
                  <td>{currency.symbol}</td>
                  <td>{currency.amount}</td>
                  <td>
                    {currency.isPrincipal ? (
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={(e) => buttonClickHandler(currency)}
                      >
                        <i className='fas fa-ban'></i> DESACTIVER
                      </Button>
                    ) : (
                      <Button
                        variant='success'
                        className='btn-sm'
                        onClick={(e) => buttonClickHandler(currency)}
                      >
                        <i className='fas fa-check'></i> ACTIVER
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => clickHandler(currency._id)}
                    >
                      <i className='fas fa-edit'></i>Editer
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(currency._id)}
                    >
                      <i className='fas fa-trash'></i> Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {pagination && (
        <Paginate pagination={pagination} action={receiveDataHandler} />
      )}
    </>
  );
};

export default CurrencyList;
