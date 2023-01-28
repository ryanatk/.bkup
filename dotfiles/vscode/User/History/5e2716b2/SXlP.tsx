import { t } from '../../../public/locales/LocaleContext';
import { BodyLink } from '../../sormus';

const CartProductRemoveButton = ({ handleRemoveCartItem }): ReactElement => {
  return (
    <button onClick={handleRemoveCartItem} data-cy={`button-remove-cart-item`}>
      <BodyLink color="dawnBlue-dark">{t('cart_remove')}</BodyLink>
    </button>
  );
};

export default CartProductRemoveButton;
