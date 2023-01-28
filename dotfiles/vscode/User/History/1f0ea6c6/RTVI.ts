import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CART_DUTIES,
  CART_SHIPPING,
  CART_SHIPPING_USD,
  MAX_QUANTITY,
} from '../../../../consts/cart';
import { MessageKey } from '../../../../public/locales/setup';
// TODO: (ECOM-3753) Need to consume contries from content (graphql get countries)
import countries from '../../../../static/data/countries.json';
import { getCountryCodeSelector } from '../../../../stores/app/selectors';
import { getCartSelector } from '../../../../stores/cart/selectors';
import { getCheckoutSelector } from '../../../../stores/checkout/selectors';
import {
  getCartChargerCount,
  getCartRingCount,
  isARing,
  isHardware,
} from '../../../../utils/cart/cartCount';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import { LineItemProps } from '../LineItem';
import { LocalState } from '../types';
import isTaxableCountry from '../utils/isTaxableCountry';

export const useCartState = (): LocalState => {
  const [loading, setLoading] = useState<boolean>(false);
  const cart = useSelector(getCartSelector);
  const checkout = useSelector(getCheckoutSelector);
  const countryCode = useSelector(getCountryCodeSelector);

  const isMultiLineEnabled = checkFeatureFlag('enable-multi-line-items');
  const isHideChargerSetEnabled = checkFeatureFlag('hide-charger-set');

  const affirmTotalPrice = useMemo((): number => {
    return Math.round((cart?.totalPriceAfterDiscount || 0) * 100);
  }, [cart?.totalPriceAfterDiscount]);

  const cartHasItems = useMemo(
    (): boolean => cart?.totalCount > 0,
    [cart?.totalCount],
  );

  const chargerCount = useMemo((): number => getCartChargerCount(cart), [cart]);
  const ringCount = useMemo((): number => getCartRingCount(cart), [cart]);
  const hasChargers = useMemo((): boolean => chargerCount > 0, [chargerCount]);
  const hasRings = useMemo((): boolean => ringCount > 0, [ringCount]);
  const maxRingsPerOrder: number = isMultiLineEnabled ? MAX_QUANTITY : 1;
  const maxChargersPerOrder: number = isHideChargerSetEnabled
    ? 0
    : MAX_QUANTITY;

  const isTooManyCartItems = useMemo(() => {
    const isTooManyRings = ringCount > maxRingsPerOrder;
    const isTooManyChargers = chargerCount > maxChargersPerOrder;

    return isTooManyRings || isTooManyChargers;
  }, [ringCount, chargerCount, maxRingsPerOrder, maxChargersPerOrder]);

  const ledgerDutiesMessage = useMemo((): MessageKey => {
    const country = countries[countryCode];
    const isUSD = country?.currency === 'USD';
    const shippingMessage = isUSD ? CART_SHIPPING_USD : CART_SHIPPING;

    return isTaxableCountry(country) ? shippingMessage : CART_DUTIES;
  }, [countryCode]);

  const lineItemsByParentId = useMemo((): {
    [parentId: string]: LineItemProps;
  } => {
    console.log('cart.lineItems', cart.lineItems);

    return cart.lineItems
      .sort((a, b) => {
        const aScore = Number(isHardware(a)) + Number(isARing(a));
        const bScore = Number(isHardware(b)) + Number(isARing(b));
        return bScore - aScore;
      })
      .reduce((acc, cur, index) => {
        console.log(cur);
        if (!acc[cur.parentId]) {
          acc[cur.parentId] = {
            parent: null,
            childItems: [],
            index,
          };
        }

        if (isHardware(cur)) {
          acc[cur.parentId].parent = cur;
        } else {
          acc[cur.parentId].childItems.push(cur);
        }

        // console.log({ acc });
        return acc;
      }, {});
  }, [cart.lineItems]);

  const cartMessage = useMemo(() => {
    if (hasRings && hasChargers) {
      if (maxRingsPerOrder === 1 && maxChargersPerOrder === 1) {
        return 'cart_one_ring_one_charger_per_order';
      } else if (maxRingsPerOrder === 1) {
        return 'cart_one_ring_max_chargers_per_order';
      } else if (maxChargersPerOrder === 1) {
        return 'cart_max_rings_one_charger_per_order';
      } else {
        return 'cart_max_rings_max_chargers_per_order';
      }
    }

    if (hasRings) {
      if (maxRingsPerOrder === 1) {
        return 'cart_one_item_per_order'; // already existed (doesn't follow pattern)
      } else {
        return 'cart_max_rings_per_order';
      }
    }

    if (hasChargers) {
      if (maxChargersPerOrder === 1) {
        return 'cart_one_charger_per_order';
      } else {
        return 'cart_max_chargers_per_order';
      }
    }
  }, [hasRings, hasChargers, maxRingsPerOrder, maxChargersPerOrder]);

  return {
    affirmTotalPrice,
    cart,
    cartHasItems,
    cartMessage,
    chargerCount,
    checkout,
    hasChargers,
    hasRings,
    isHideChargerSetEnabled,
    isMultiLineEnabled,
    isTooManyCartItems,
    ledgerDutiesMessage,
    lineItemsByParentId,
    loading,
    maxChargersPerOrder,
    maxRingsPerOrder,
    ringCount,
    setLoading,
  };
};
