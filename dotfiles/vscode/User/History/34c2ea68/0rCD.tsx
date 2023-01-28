import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import useCurrency from '../../../helpers/useCurrency';
import { t } from '../../../public/locales/LocaleContext';
import CartState, { CartLineItem } from '../../../types/CartState';
import CheckoutState from '../../../types/CheckoutState';
import generateOrderLedger, {
  LedgerItem,
} from '../../../utils/generateOrderLedger';
import { getDutiesAlert } from '../../stateful/utils/shopping';
import Alert from '../Alert';
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableRow,
  Typography,
} from '../index';
import LineItemRow from '../LineItemRow';

interface CheckoutOrderTableProps {
  cart: CartState;
  checkout: CheckoutState;
}

/**
 * Get specific classes based on current line item index, and total number of line items
 */
export const getTableCellClass = (index: number, totalItems: number) => {
  if (totalItems === 1) return 'py-4';
  else if (index === 0) return 'pt-4';
  else if (index + 1 === totalItems) return 'pb-4';

  return '';
};

const CheckoutOrderTable: FC<CheckoutOrderTableProps> = ({
  checkout,
  cart,
}) => {
  console.log({ checkout, cart });
  const { formatPrice } = useCurrency();
  const { formatMessage } = useIntl();

  const ledger = generateOrderLedger(checkout, cart);
  const dutiesNote = getDutiesAlert(checkout.shippingAddress.country);

  console.log({ ledger });

  if (!cart.lineItems) return null;

  return (
    <>
      <Table unstyled className="text-helsinkiBlue">
        <TableBody>
          {cart.lineItems.map((lineItem: CartLineItem) => (
            <LineItemRow key={lineItem.id} item={lineItem} />
          ))}
        </TableBody>
        <TableFoot>
          {ledger.map((item: LedgerItem, index: number) => (
            <TableRow
              key={item.id}
              className={index === 0 ? `border-t border-sand-dark` : ``}
            >
              <TableCell
                Element="th"
                scope="row"
                colSpan={2}
                className={getTableCellClass(index, ledger.length)}
              >
                {t(
                  item.label_translation.key,
                  item.label_translation.params || {},
                )}
              </TableCell>
              <TableCell
                data-cy={`checkout-order-${item.id}`}
                data-value={item.value}
                className={`text-right ${getTableCellClass(
                  index,
                  ledger.length,
                )}`}
              >
                {item.id === 'shipping' &&
                item.value === 0 &&
                item.valueUndiscounted ? (
                  <>
                    <del data-cy="checkout-order-original_shipping">
                      {formatPrice(item.valueUndiscounted)}
                    </del>{' '}
                    <span data-cy="checkout-order-discount_shipping">
                      {formatMessage({ id: 'cart_free' })}
                    </span>
                  </>
                ) : (
                  formatPrice(item.value)
                )}
              </TableCell>
            </TableRow>
          ))}
          {!!checkout.totalPriceAfterTax && (
            <TableRow className="border-t border-sand-dark">
              <TableCell Element="th" scope="row" colSpan={2} className="pt-4">
                {t('checkout_order_table_total')}
              </TableCell>
              <TableCell
                data-cy={`checkout-order-total_after_tax`}
                data-value={checkout.totalPriceAfterTax}
                className="text-right pt-4"
              >
                {formatPrice(checkout.totalPriceAfterTax)}
              </TableCell>
            </TableRow>
          )}
        </TableFoot>
      </Table>
      {dutiesNote && (
        <Alert className="mt-4">
          <Typography variant="eyebrow">{dutiesNote}</Typography>
        </Alert>
      )}
    </>
  );
};

export default CheckoutOrderTable;
