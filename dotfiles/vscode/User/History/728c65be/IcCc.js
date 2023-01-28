import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useMutation, useQuery } from 'react-query';

import { updateAddress } from 'data/orders';
import { getCustomerData, updateCustomerInfo } from 'data/customers';
import { ADDRESS_TYPE, PHONE_TYPE } from 'common/const';
import { useAuth } from '..';
import reducer, { init, TYPE } from './reducer';

// Helper functions
const Customer = createContext();

export const CustomerProvider = ({ children }) => {
  const { customerId } = useAuth();
  const [state = {}, dispatch] = useReducer(reducer, init({ customerId }));

  const getMutationOptions = (payload) => ({
    onSuccess: () => dispatch({ type: TYPE.SUCCESS, payload }),
    onError: () => dispatch({ type: TYPE.ERROR, payload }),
  });

  const { mutate: changeName, isLoading: isUpdatingName } = useMutation(
    ({ firstName, lastName }) => {
      dispatch({ type: TYPE.CHANGE_NAME, payload: { firstName, lastName } });
      return updateCustomerInfo({ id: customerId, firstName, lastName });
    },
    getMutationOptions('Name'),
  );

  // const { mutate: changeCompany, isLoading: isUpdatingCompany } = useMutation(
  //   ({ address }) => {
  //     // Use company update endpoint
  //     dispatch({ type: TYPE.CHANGE_COMPANY, payload: { address } });
  //     updateAddress({ customerId, address });
  //   },
  //   {
  //     ...getMutationOptions('Company'),
  //   }
  // );

  const { mutate: changePhone, isLoading: isUpdatingPhone } = useMutation(
    ({ address, phone, phoneType }) => {
      const payload =
        phoneType === PHONE_TYPE.MOBILE ? { mobile: phone } : { phone: phone };

      dispatch({ type: TYPE.CHANGE_PHONE, payload });
      return updateAddress({
        type: 'Customer',
        address: { ...address, ...payload },
        customerId,
        ooId: 0,
      });
    },
    getMutationOptions('Phone number'),
  );

  const { mutate: changeAddress, isLoading: isUpdatingAddress } = useMutation(
    ({ address }) => {
      dispatch({ type: TYPE.CHANGE_ADDRESS, payload: address });
      return updateAddress({
        type: ADDRESS_TYPE.CUSTOMER,
        // address,
        customerId,
        ooId: 0,
      });
    },
    getMutationOptions('Office Address'),
  );

  const reset = (payload) => dispatch({ type: TYPE.RESET, payload });
  const closeToast = () => dispatch({ type: TYPE.CLOSE_TOAST });

  useEffect(() => {
    if (!customerId) {
      reset(); // clear customer data
    }
  }, [customerId]);

  // get customer data (for page refresh, etc)
  const { isLoading } = useQuery(
    ['getCustomerData', customerId],
    () => getCustomerData(customerId),
    {
      onSuccess: (payload) => dispatch({ type: TYPE.LOAD, payload }),
      enabled: Boolean(customerId),
    },
  );

  const isUpdating = useMemo(
    () =>
      // isUpdatingCompany ||
      isUpdatingName || isUpdatingPhone || isLoading || isUpdatingAddress,
    [
      // isUpdatingCompany,
      isUpdatingName,
      isUpdatingPhone,
      isLoading,
      isUpdatingAddress,
    ],
  );

  return (
    <Customer.Provider
      value={{
        ...state,
        isUpdating,
        changeName,
        // changeCompany,
        changePhone,
        changeAddress,
        reset,
        closeToast,
      }}
    >
      {children}
    </Customer.Provider>
  );
};

export const useCustomer = () => useContext(Customer);
