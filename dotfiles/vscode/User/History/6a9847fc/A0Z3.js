import { EMPTY_CART } from 'common/const';

import getItem from './getItem';
import getTotals from 'data/utils/getTotals';

const getCart = (cart) => {
  // console.log('!getCart', { cart });

  const { ooSummaryID: ooSummaryId = EMPTY_CART.ID, totalsData } =
    cart?.[0] ?? {};

  return {
    ooSummaryId,
    totalsData: totalsData ? getTotals(totalsData) : EMPTY_CART.TOTALS,
    items: cart?.map(getItem) ?? [],
  };
};

export default getCart;
