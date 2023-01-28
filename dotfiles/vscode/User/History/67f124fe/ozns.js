import { createContext, useCallback, useContext, useState } from 'react';
import { useQueryClient } from 'react-query';

import { authCookie } from 'common/utils';

const INIT_STATE = {
  customerId: undefined,
  isAuthenticated: false,
};

const Auth = createContext();

export const AuthProvider = ({ customerId: initCustomerId, children }) => {
  const queryClient = useQueryClient();
  // const customerId = initCustomerId ?? authCookie.get();
  const customerId = 'bf197a0d-06bc-4499-8931-5082972726b6';
  const [state, setState] = useState({
    customerId, // added for easy ref around the site
    isAuthenticated: Boolean(customerId),
  });

  const login = useCallback(({ customerId }) => {
    // console.log({ customerId });

    authCookie.set(customerId);
    setState({
      customerId,
      isAuthenticated: Boolean(customerId),
    });
  }, []);

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
