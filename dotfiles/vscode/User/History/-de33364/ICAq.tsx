import IconAmex from '../../../svg/amex.svg';
import IconDiscover from '../../../svg/discover.svg';
import IconJcb from '../../../svg/jcb.svg';
import IconMastercard from '../../../svg/mastercard.svg';
import IconVisa from '../../../svg/visa.svg';
import { PaymentBrandType } from '../../../types/Payment';
import styles from './PaymentBrandIcon.module.scss';

type Size = 'default' | 'small' | 'large';

interface PaymentBrandIconProps {
  brand: PaymentBrandType;
  size?: Size;
}

const getSizeModifierStyles = (size: Size): string => {
  switch (size) {
    case 'small':
      return styles['PaymentBrandIcon--small'];
    case 'large':
      return styles['PaymentBrandIcon--large'];
    default:
      return '';
  }
};

const PaymentBrandIcon = ({
  brand,
  size = 'default',
}: PaymentBrandIconProps) => {
  return (
    <div
      className={`${styles.PaymentBrandIcon} ${getSizeModifierStyles(size)}`}
    >
      {{
        visa: <IconVisa />,
        mastercard: <IconMastercard />,
        jcb: <IconJcb />,
        amex: <IconAmex />,
        discover: <IconDiscover />,
      }[brand.toLowerCase()] || null}
    </div>
  );
};

export default PaymentBrandIcon;
