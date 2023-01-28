import { ReactElement } from 'react';
import { PaymentBrandType } from '../../../types/Payment';
import PaymentBrandIcon from '../PaymentBrandIcon';

export const CREDIT_CARDS: PaymentBrandType[] = [
  'visa',
  'mastercard',
  'amex',
  'discover',
  'jcb',
];

const CreditCardIcons = ({
  size,
  disabled = [],
}: {
  size: 'default' | 'small' | 'large';
  disabled?: PaymentBrandType[];
}): ReactElement => {
  return (
    <div className="flex flex-wrap justify-center gap-x-1">
      {CREDIT_CARDS.filter(
        (brand: PaymentBrandType) => !disabled.includes(brand),
      ).map((brand: PaymentBrandType) => (
        <div key={brand}>
          <PaymentBrandIcon brand={brand} size={size} />
        </div>
      ))}
    </div>
  );
};

export default CreditCardIcons;
