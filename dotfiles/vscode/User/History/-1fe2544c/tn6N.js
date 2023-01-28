import { useEffect } from 'react';
import { oneOf, string } from 'prop-types';
import { useLocation } from 'react-router';

import { getSiteProps } from 'common/utils';

import {
  AccountPage,
  OrderPage,
  CenteredPage,
  ShoppingPage,
  IslandPage,
  Print,
} from './variants';
import withChat from './withChat';

const { TITLE: siteTitle } = getSiteProps();

export const VARIANT = {
  ACCOUNT: 'account',
  CENTERED: 'centered', // default
  ISLAND: 'island',
  ORDER: 'order',
  PRINT: 'print',
  SHOPPING: 'shopping',
};

const Page = ({ variant, title, ...props }) => {
  // console.log('<Page>', { variant,  props });

  useEffect(() => {
    document.title = ['Online Ordering', siteTitle, title]
      .filter((txt) => Boolean(txt)) // remove undefined & empty strings
      .join(' - ');
  }, [title]);

  switch (variant) {
    case VARIANT.ACCOUNT:
      return <AccountPage {...props} />;
    case VARIANT.ISLAND:
      return <IslandPage {...props} title={title} />;
    case VARIANT.ORDER:
      return <OrderPage {...props} />;
    case VARIANT.SHOPPING:
      return <ShoppingPage {...props} />;
    case VARIANT.PRINT:
      return <Print {...props} hideChat="print" />;
    default:
      return <CenteredPage {...props} />;
  }
};

Page.propTypes = {
  title: string,
  variant: oneOf(Object.values(VARIANT)),
};

export default withChat(Page);
