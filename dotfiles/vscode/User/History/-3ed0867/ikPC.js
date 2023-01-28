import { useMemo } from 'react';
import { any, array, bool, func, oneOf } from 'prop-types';
import { Redirect } from 'react-router';

import { useShop } from 'app/context';
import { ROUTE } from 'common/const';

const Require = ({
  data = [], // optional data array to check
  test = () => true, // optional test fn to run (redirects on falsey)
  redirect = ROUTE.DASHBOARD, // optional redirect route

  // optional pre-configured flags, to check for common requirements
  shop: isShopRequired,

  children,
}) => {
  // console.log('<Require>', { data, test, redirect, isShopRequired });

  // shop context
  const shop = useShop();
  const shopData = useMemo(
    () => (isShopRequired ? [shop.eventId, shop.ooSummaryId] : []),
    [isShopRequired, shop.eventId, shop.ooSummaryId],
  );

  const isMissingData = useMemo(
    () => [...data, ...shopData].some((value) => value === undefined),
    [data, shopData],
  );

  if (isMissingData || !test({ shop })) {
    console.log({ isMissingData, data });
    return <Redirect to={redirect} />;
  }

  return children;
};

Require.propTypes = {
  data: array,
  redirect: oneOf(Object.values(ROUTE)),
  shop: bool,
  test: func,
  children: any,
};

export default Require;
