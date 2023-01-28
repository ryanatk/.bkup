import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, Ref, useEffect, useState } from 'react';
import { useHeaderContext } from '../../../contexts/HeaderContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { breakpoints } from '../constants';
import DiscountMessage from '../DiscountMessage';
import Eyebrow from '../Eyebrow';
import Grid from '../Grid';
import VectorImage from '../VectorImage';
import CartButton from './CartButton';
import HamburgerButton from './HamburgerButton';
import HeaderBlur from './HeaderBlur';
import HeaderLinks from './HeaderLinks';
import useStickyHeader from './hooks/useStickyHeader';
import styles from './HorizonHeader.module.scss';
import { HeaderProps } from './index';
import ShopButton from './ShopButton';

const Header = forwardRef(function Header(
  {
    shopButton = {
      label: t('header_shop_now'),
    },
    hideLinks = false,
    showCart = true,
    showDiscountBanner = false,
    bordered = false,
    inverse = false,
    eyebrowProps = null,
  }: HeaderProps,
  ref: Ref<HTMLDivElement>,
): JSX.Element {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const { sticky, pinned, measuredRef, wrapperStyles } = useStickyHeader();
  const { inverse: _inverse } = useHeaderContext();
  const isInverse = inverse || _inverse;
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const router = useRouter();

  const handleHamburgerClick = () => {
    setOffcanvasOpen((prevOffcanvasOpen) => !prevOffcanvasOpen);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setOffcanvasOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div
      className={cx(styles.wrapper, {
        [styles['wrapper--sticky']]: sticky,
        [styles['wrapper--pinned']]: pinned,
        [styles['wrapper--inverse']]: isInverse,
      })}
      style={wrapperStyles}
      ref={ref}
    >
      <HeaderBlur className={styles.blur} />

      <div
        className={cx(styles.offcanvasOverlay, {
          [styles['offcanvasOverlay--open']]: offcanvasOpen,
        })}
        aria-hidden="true"
        onClick={() => {
          setOffcanvasOpen(false);
        }}
      />

      {!sticky && <Eyebrow {...eyebrowProps} />}

      <header className={styles.header} ref={measuredRef}>
        <Grid>
          <div className={styles.headerInner}>
            {!hideLinks && (
              <HamburgerButton
                onClick={handleHamburgerClick}
                open={offcanvasOpen}
              />
            )}

            <Link href="/">
              <a className={styles.logo} id="nav_home" aria-label="Oura home">
                <VectorImage color="inherit" name="oura" maxWidth={100} />
              </a>
            </Link>

            <div className={styles.headerMain}>
              {!hideLinks && !(matchLargeScreen && sticky) && (
                <HeaderLinks
                  offcanvasOpen={offcanvasOpen}
                  isInverse={isInverse}
                  shopButton={shopButton}
                />
              )}

              <div className="flex items-center">
                {showCart && <CartButton />}

                {!!shopButton && (
                  <ShopButton
                    data-cy="nav_shopcta"
                    inverse={isInverse}
                    size={sticky ? 'small' : 'normal'}
                    className={styles.shopCta}
                    {...shopButton}
                  />
                )}
              </div>
            </div>
          </div>
        </Grid>
      </header>

      {showDiscountBanner && (
        <DiscountMessage
          hide={sticky}
          showBorder={bordered}
          hideBorder={sticky}
        />
      )}
    </div>
  );
});

export default Header;
