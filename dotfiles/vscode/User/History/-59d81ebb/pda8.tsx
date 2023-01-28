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
import {
  CartButton,
  HamburgerButton,
  HeaderBlur,
  HeaderLinks,
  HeaderOverlay,
  ShopButton,
} from './components';
import { useStickyHeader } from './hooks';
import useHeaderA11y from './hooks/useHeaderA11y';
import styles from './HorizonHeader.module.scss';
import { HeaderProps } from './index';

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
  const { menuRef, menuTriggerRef } = useHeaderA11y({
    isOpen: offcanvasOpen,
    setIsOpen: setOffcanvasOpen,
    matchLargeScreen,
  });

  const handleHamburgerClick = () => {
    setOffcanvasOpen((prevOffcanvasOpen) => !prevOffcanvasOpen);
  };

  const handleOverlayClick = () => {
    setOffcanvasOpen(false);
  };

  // when a user expands the screen, close the menu
  useEffect(() => {
    if (matchLargeScreen) {
      setOffcanvasOpen(false);
    }
  }, [matchLargeScreen]);

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
      <HeaderBlur sticky={sticky} pinned={pinned} inverse={isInverse} />

      <HeaderOverlay open={offcanvasOpen} onClick={handleOverlayClick} />

      <Eyebrow {...eyebrowProps} sticky={sticky} />

      <header className={styles.header} ref={measuredRef}>
        <Grid>
          <div className={styles.headerInner}>
            <HamburgerButton
              ref={menuTriggerRef}
              onClick={handleHamburgerClick}
              open={offcanvasOpen}
            />
            <Link href="/">
              <a
                className={styles.logo}
                data-cy="nav_logo_link"
                id="nav_home"
                aria-label="Oura home"
              >
                <VectorImage color="inherit" name="oura" maxWidth={100} />
              </a>
            </Link>

            <div className={styles.headerMain}>
              {!(matchLargeScreen && (hideLinks || sticky)) && (
                <HeaderLinks
                  ref={menuRef}
                  offcanvasOpen={offcanvasOpen}
                  isInverse={isInverse}
                  shopButton={shopButton}
                />
              )}

              <div className={styles.shopping}>
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
