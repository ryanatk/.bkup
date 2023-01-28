import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { BodyLink } from '../../sormus';

interface Props {
  handleRemoveCartItem: () => void;
}

const CartProductRemoveButton = ({
  handleRemoveCartItem,
}: Props): ReactElement => (
  <button onClick={handleRemoveCartItem} data-cy={`button-remove-cart-item`}>
    <BodyLink color="dawnBlue-dark">{t('cart_remove')}</BodyLink>
  </button>
);

export default CartProductRemoveButton;
