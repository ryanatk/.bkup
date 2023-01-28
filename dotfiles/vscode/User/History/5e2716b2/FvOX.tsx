import { t } from '../../../public/locales/LocaleContext';
import { BodyLink } from '../../sormus';

interface Props {
  onRemoveCartItem: () => void;
}

const CartProductRemoveButton = ({ onRemoveCartItem }: Props): JSX.Element => (
  <button onClick={onRemoveCartItem} data-cy={`button-remove-cart-item`}>
    <BodyLink color="dawnBlue-dark">{t('cart_remove')}</BodyLink>
  </button>
);

export default CartProductRemoveButton;
