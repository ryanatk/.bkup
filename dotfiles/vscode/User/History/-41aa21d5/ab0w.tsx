import { PaymentBrandType } from '../../../types/Payment';
import PaymentBrandIcon from '../PaymentBrandIcon';

const CreditCardIcons = ({
  size,
  disabled = [],
}: {
  size: 'default' | 'small' | 'large';
  disabled?: PaymentBrandType[];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-1">
      {['visa', 'mastercard', 'amex', 'discover', 'jcb']
        .filter((brand: PaymentBrandType) => !disabled.includes(brand))
        .map((brand: PaymentBrandType) => (
          <div key={brand}>
            <PaymentBrandIcon brand={brand} size={size} />
          </div>
        ))}
    </div>
  );
};

export default CreditCardIcons;
