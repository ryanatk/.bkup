import { createContext, useCallback, useContext, useState } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';

import { authCookie } from 'common/utils';

const INIT_STATE = {
  customerId: undefined,
  isAuthenticated: false,
};

const Auth = createContext();

export const AuthProvider = ({
  customerId: initCustomerId,
  jwtToken,
  children,
}) => {
  const queryClient = useQueryClient();
  const customerId = initCustomerId ?? authCookie.get();
  const [state, setState] = useState({
    customerId, // added for easy ref around the site
    isAuthenticated: Boolean(customerId),
  });

  const login = useCallback(
    ({ customerId }) => {
      // console.log({ customerId });

      // console.log({ axios });
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      authCookie.set(customerId);
      setState({
        customerId,
        isAuthenticated: Boolean(customerId),
      });
    },
    [jwtToken],
  );

  const logout = useCallback(() => {
    authCookie.remove();
    setState(INIT_STATE);
    queryClient.clear();
  }, [queryClient]);

  const update = useCallback(() => {
    const isLoggedIn = authCookie.exists();

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
