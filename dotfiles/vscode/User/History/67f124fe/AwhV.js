import { createContext, useCallback, useContext, useState } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import { authCookie } from 'common/utils';

const JWT_TOKEN = 'jwtToken';

const { getItem, setItem, removeItem } = sessionStorage;

const INIT_STATE = {
  customerId: undefined,
  isAuthenticated: false,
};

const Auth = createContext();

export const AuthProvider = ({ customerId: initCustomerId, children }) => {
  const queryClient = useQueryClient();
  const customerId = initCustomerId ?? authCookie.get();
  const [state, setState] = useState({
    customerId, // added for easy ref around the site
    isAuthenticated: Boolean(customerId) && Boolean(getItem(JWT_TOKEN)),
  });

  const login = useCallback(({ customerId, jwtToken }) => {
    // console.log({ customerId });

    if (jwtToken) {
      // set header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      // use session storage to limit auth to a single tab
      setItem(JWT_TOKEN, jwtToken);
    }

    // use cookie to set auth to expire after a specific time
    authCookie.set(customerId);

    setState({
      customerId,
      isAuthenticated: Boolean(customerId) && Boolean(getItem(JWT_TOKEN)),
    });
  }, []);

  const logout = useCallback(() => {
    removeItem(JWT_TOKEN);
    authCookie.remove();
    setState(INIT_STATE);
    queryClient.clear();
  }, [queryClient]);

  const update = useCallback(() => {
    const isLoggedIn = authCookie.exists() && getItem(JWT_TOKEN);

    return isLoggedIn ? authCookie.set(customerId) : logout();
  }, [logout, customerId]);

  return (
    <Auth.Provider
      value={{
        ...state,
        login,
        logout,
        update,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
