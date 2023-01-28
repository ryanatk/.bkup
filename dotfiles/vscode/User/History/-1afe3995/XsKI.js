import { createContext, useContext, useEffect, useState } from 'react';
import { any, number, string } from 'prop-types';

const INIT_STATE = {
  boothNumber: '1',
  ooSummaryId: 0,
  eventId: undefined,
  package: {},
};

// helper function (shallow, and returns immutable)
const combine = (...args) => Object.assign({}, ...args);

const Shop = createContext();

export const ShopProvider = ({
  shop: initialShop, // for storybook
  children,
}) => {
  const [shop, setShop] = useState(Object.assign({}, INIT_STATE, initialShop));

  // pass in object with values to update, and keep the rest
  const update = (updatedProps) =>
    setShop((prevState) => combine(prevState, updatedProps));

  // pass in object with new state, and wipe the rest
  const reset = (newState) => setShop(combine(INIT_STATE, newState));

  useEffect(() => console.log({ shop }), [shop]);

  return (
    <Shop.Provider value={{ ...shop, update, reset, setShop }}>
      {children}
    </Shop.Provider>
  );
};

Shop.propTypes = {
  boothNumber: string,
  eventId: string,
  ooSummaryId: number,
  children: any,
};

export const useShop = () => useContext(Shop);
