import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listOrdersHandler,
  resetNotifications,
  listAllOrdersForUserAdminHandler,
} from '../../redux/actions/order';
import { convertDate } from '../../utils/date';
import Paginate from '../utilities/Paginate';

const OrderList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, pagination, orders } = useSelector(
    (state) => state.orderList
  );

  useEffect(() => {
    if (id) {
      dispatch(
        listAllOrdersForUserAdminHandler(
          'select=totalPrice,isDelivered,createdAt,user&limit=10',
          '',
          id
        )
      );
    } else {
      dispatch(
        listOrdersHandler(
          'select=totalPrice,isDelivered,createdAt,user&limit=10',
          ''
        )
      );
    }
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
    router.push(`/admin/orders/${orderId}`);
  }

  // pagination handler
  function receiveDataHandler(page) {
    if (id) {
      dispatch(
        listAllOrdersForUserAdminHandler(
          'select=totalPrice,isDelivered,createdAt,user&limit=10',
          page,
          id
        )
      );
    } else {
      dispatch(
        listOrdersHandler(
          'select=totalPrice,isDelivered,createdAt,user&limit=10',
          page
        )
      );
    }
  }

  return (
    <>
      {orders && orders.length < 1 ? (
        <Alert variant='warning'>Il 'y a pas de commandes.</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
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
                  <td>{order?.user?.name}</td>
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
