import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listMyOrdersHandler,
  resetNotifications,
} from '../../redux/actions/order';
import { useMe } from '../../context/userContext';
import { convertDate } from '../../utils/date';
import Paginate from '../utilities/Paginate';

const OrderList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useMe();

  const { loading, error, pagination, orders } = useSelector(
    (state) => state.orderList
  );

  useEffect(() => {
    dispatch(
      listMyOrdersHandler(
        'select=totalPrice,isDelivered,createdAt&limit=10',
        '',
        user && user._id
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  if (loading) {
    return <Loader />;
  }

  function clickHandler(orderId) {
    router.push(`/orders/${orderId}`);
  }

  function receiveDataHandler(page) {
    dispatch(
      listMyOrdersHandler(
        'select=totalPrice,isDelivered,createdAt&limit=10',
        page,
        user && user._id
      )
    );
  }

  return (
    <>
      {orders && orders.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore commandé de produits.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>LIVRAISON</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order &&
                      convertDate(order.createdAt, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                  </td>
                  <td>HTG {order.totalPrice}</td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => clickHandler(order._id)}
                    >
                      <i className='far fa-eye'></i> Voir infos
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

export default OrderList;
