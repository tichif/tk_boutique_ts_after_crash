import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import { pageView } from '../hooks/useGATracker';
import { wrapper } from '../redux/store';
import { MeContextProvider } from '../context/userContext';
import { CartContextProvider } from '../context/cartContext';
import { OrderContextProvider } from '../context/orderContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageView(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <MeContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <Elements stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
          </OrderContextProvider>
        </CartContextProvider>
      </MeContextProvider>
      <ToastContainer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
