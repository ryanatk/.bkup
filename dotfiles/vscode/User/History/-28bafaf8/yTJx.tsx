import Link from 'next/link';
import { useSelector } from 'react-redux';
import { t } from '../../../../public/locales/LocaleContext';
import { getCartSelector } from '../../../../stores/cart/selectors';
import { getCartIconCount } from '../../../../utils/cartCount';
import VectorImage from '../../VectorImage';
import styles from './CartButton.module.scss';

const CartButton = (): JSX.Element => {
  const cart = useSelector(getCartSelector);
  const hasItemsInCart = cart?.totalCount > 0;
  const count = cart && getCartIconCount(cart);

  return hasItemsInCart ? (
    <Link href="/cart" passHref>
      <a data-cy="nav_cart" className={styles.cartButton}>
        <span className="sr-only">
          {t('header_cart_sr_label', {
            itemCount: `${count}`,
          })}
        </span>

        <div aria-hidden="true">
          <VectorImage
            name="shopping_bag"
            width={21}
            height={26}
            color="current"
            className={styles.cartButtonIcon}
          />

          <span className={styles.cartButtonCount}>{count}</span>
        </div>
      </a>
    </Link>
  ) : null;
};

export default CartButton;
