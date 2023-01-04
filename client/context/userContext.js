import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Loader from '../components/utilities/Loader';

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

const MeContext = createContext({
  user: null,
  loading: true,
  error: null,
  refetchUser: () => {},
  clearUser: () => {},
});

const MeContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const loadUserForInitialState = async () => {
    try {
      setLoading(true);
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${SERVER_API}/profile/myprofile`,
        config
      );
      setLoading(false);
      setUser(data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      );
    }
  };

  useEffect(() => {
    loadUserForInitialState();
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      loadUserForInitialState();
    }
  }, [shouldRefetch]);

  function refetchUser() {
    setError(null);
    setUser(null);
    setLoading(false);
    setShouldRefetch(true);
  }

  function clearUser() {
    setUser(null);
  }

  return (
    <MeContext.Provider
      value={{ user, error, loading, refetchUser, clearUser }}
    >
      {loading ? <Loader /> : children}
    </MeContext.Provider>
  );
};

const useMe = () => useContext(MeContext);

export { useMe, MeContextProvider };
