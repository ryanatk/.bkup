import React from 'react';
import { useSelector } from 'react-redux';
import useCurrency from '../../../helpers/useCurrency';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import countries from '../../../static/data/countries.json';
import { getCountryCodeSelector } from '../../../stores/app/selectors';
import { getCartSelector } from '../../../stores/cart/selectors';
import { getCheckoutSelector } from '../../../stores/checkout/selectors';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { Typography } from '../../sormus';
import { getNotice, isTaxableCountry } from './helper';
import Ledger from './Ledger';

const shoppingNote = t('cart_free_shipping_message');
const dutiesMessage = t('cart_duties_message');
const usDollarsMessage = t('cart_free_shipping_usd_message');

const getFreeShippingTestNotice = (shipToCountry: string): JSX.Element => {
  const country = countries[shipToCountry];
  const isCurrencyEuros: boolean = country && country.currency === 'EUR';
  const taxMessage = !isCurrencyEuros ? usDollarsMessage : shoppingNote;

  return isTaxableCountry(country) ? taxMessage : dutiesMessage;
};

const getTaxName = (
  taxName: string,
  translateFn: (id: MessageKey) => string,
) => {
  switch (taxName.toLowerCase()) {
    case 'tax':
      return translateFn('cart_tax');
    case 'vat':
      return translateFn('cart_tax');
    default:
      return taxName || translateFn('cart_tax');
  }
};

function CartLedger() {
  const checkout = useSelector(getCheckoutSelector);
  const cart = useSelector(getCartSelector);
  const { formatPrice } = useCurrency();
  const countryCode = useSelector(getCountryCodeSelector);
  const isFreeShippingEnabled = checkFeatureFlag('free-shipping-messaging');
  const taxName = getTaxName(checkout.taxName, t);
  const isVat = checkout.isVatVisible;

  const isCartDiscount = cart.cartDiscount.coupon ? true : false;
  const cartDiscountCoupon = cart.cartDiscount.coupon;
  const cartDiscountValue = cart.cartDiscount.value;

  const showCheckoutSummary =
    checkout.isDone &&
    checkout.initiated &&
    checkout.shippingRate &&
    checkout.totalPriceAfterTax >= 0 &&
    checkout.cart &&
    checkout.cart.totalPrice &&
    checkout.cart.totalPrice === cart.totalPrice
      ? true
      : false;

  const dutiesText: any = isFreeShippingEnabled
    ? getFreeShippingTestNotice(countryCode)
    : getNotice(countryCode);

  let rows = [];

  if (showCheckoutSummary) {
    rows.push({
      label: t('cart_subtotal'),
      value: formatPrice(cart.totalPriceAfterDiscount),
    });

    rows.push({
      label: t('cart_shipping'),
      value: formatPrice(checkout.shippingRate.price),
    });

    if (isVat) {
      if (checkout.isTaxExempt) {
        rows.push({
          label: t('order_ledger_tax_exempt', {
            tax_name: taxName,
          }),
          value: `- ${formatPrice(checkout.totalTax)}`,
        });
      } else {
        rows.push({
          label: t('order_ledger_tax_included', {
            tax_name: taxName,
          }),
          value: formatPrice(checkout.totalTax),
        });
      }
    } else {
      rows.push({
        label: `${taxName}`,
        value: formatPrice(checkout.totalTax),
      });
    }

    rows.push({
      label: t('cart_total'),
      value: formatPrice(checkout.totalPriceAfterTax),
      isTotal: true,
    });
  } else {
    const appliedDiscount = {};

    rows = [
      appliedDiscount,
      {
        label: t('cart_subtotal'),
        value: formatPrice(cart.totalPriceAfterDiscount),
        note: '',
      },
    ];
  }

  return (
    <>
      {isCartDiscount && (
        <div>
          {t('cart_coupon')} : {cartDiscountCoupon} | -{cartDiscountValue}
        </div>
      )}
      <Ledger rows={rows} />

      {dutiesText && (
        <Typography
          variant="body"
          data-cy="duties-text"
          weight="normal"
          color="grayscale-dark"
          className="mt-4"
        >
          {dutiesText}
        </Typography>
      )}
    </>
  );
}

export default CartLedger;
