import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Ref, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { getCartSelector } from '../../../stores/cart/selectors';
import { getCartIconCount } from '../../../utils/cartCount';
import Button from '../Button';
import { breakpoints } from '../constants';
import DiscountMessage from '../DiscountMessage';
import Grid from '../Grid';
import ShoppingBag from '../ShoppingBag';
import VectorImage from '../VectorImage';
import styles from './Header.module.scss';

export interface HeaderProps {
  /** optional bordered bottom */
  bordered?: boolean;
  /** what to show for shop CTA */
  shopButton?:
    | {
        label: React.ReactElement | React.ReactFragment | string | false;
        link?: string;
      }
    | false;
  /** inverse colors to white */
  inverse?: boolean;
  /** whether to show discount banner if there's a message */
  showDiscountBanner?: boolean;
  /** optional reference element */
  ref?: Ref<HTMLDivElement>;
  /** optional prop to show the cart */
  showCart?: boolean;
  /** optional prop to hide all links */
  hideLinks?: boolean;
  /** optional prop to not change header on scroll */
  scrollChange?: boolean;
  /** additional styles */
  className?: string;
  /** optional callback when header updates */
  onHeaderUpdate?: (discountMessage: JSX.Element) => void;
}

interface ShopButtonProps {
  inverse?: boolean;
  headerScrolled?: boolean;
  label: React.ReactElement | React.ReactFragment | string | false;
  link?: string;
  [x: string]: any;
}

const bilboProductPagePath = '/product/heritage-silver';
const INIT_SCROLL = 'init-scroll';
const DEEP_SCROLL = 'deep-scroll';

const ShopButton = ({
  inverse = false,
  headerScrolled = false,
  label,
  link,
  ...rest
}: ShopButtonProps) => {
  const router = useRouter();
  const asPath = router?.asPath;

  const handleAnalytics = () => {
    sendGTMWithSegmentEvent({
      type: EventType.CTAClicked,
      payload: {
        cta: 'buy',
        location: 'header',
        path: asPath,
      },
    });
  };

  return (
    <Button
      variant={!inverse ? 'tertiary' : headerScrolled ? 'tertiary' : 'ghost'}
      href={link || bilboProductPagePath}
      onClick={handleAnalytics}
      link
      target={link !== bilboProductPagePath ? '_blank' : undefined}
      {...rest}
    >
      {label}
    </Button>
  );
};

const HamburgerButton = ({ onClick, open }) => (
  <button
    aria-label="toggle menu"
    data-menu-button
    data-cy="button-toggle-menu"
    className={
      open
        ? styles['header__mobile_hamburger--open']
        : styles.header__mobile_hamburger
    }
    onClick={onClick}
  >
    <span />
  </button>
);

const Header: React.FC<HeaderProps> = React.forwardRef(
  (
    {
      bordered,
      shopButton = { label: t('header_shop_now') },
      hideLinks = false,
      inverse = false,
      showCart = true,
      showDiscountBanner = false,
      scrollChange = true,
      className = '',
      onHeaderUpdate,
    },
    ref: Ref<HTMLDivElement>,
  ) => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState('');
    const cart = useSelector(getCartSelector);
    const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);

    const handleCloseMenu = () => setVisible(false);

    const handleMobileToggle = (e) => {
      e.preventDefault();
      setVisible((prevState) => !prevState);
    };

    useEffect(() => {
      if (scrollChange) {
        const onScroll = () => {
          if (window.scrollY > 20) return setScrolled(DEEP_SCROLL);
          if (window.scrollY > 2) return setScrolled(INIT_SCROLL);
          return setScrolled(null);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }
    }, []);

    const hasItemsInCart = cart && cart.totalCount > 0;

    const cartCount = cart && getCartIconCount(cart);

    const displayCart = hasItemsInCart && showCart;

    const isDeepScroll = scrolled === DEEP_SCROLL;
    const isInitScroll = scrolled === INIT_SCROLL;

    return (
      <div
        ref={ref}
        className={`${styles.headerWrapper} ${className ? className : ''}`}
      >
        <header
          className={`${visible ? styles['header--fixed'] : styles.header} ${
            scrolled ? styles['header--filled'] : ''
          } ${inverse ? styles['header--inverse'] : ''}`}
        >
          <Grid className="items-center">
            <div className={styles.header__logo}>
              <Link href="/">
                <a id="nav_home" aria-label="Oura home">
                  <VectorImage name="oura" maxWidth={100} />
                </a>
              </Link>
            </div>

            <div className={styles.header__nav}>
              <nav className={styles.header__links} data-cy="bilbo-nav">
                {!hideLinks && (
                  <>
                    <Link href="/meet-the-community">
                      <a
                        data-menu-link
                        id="nav_meetthecommunity"
                        onClick={handleCloseMenu}
                        className="lg:mr-12"
                      >
                        {t('header_meet_the_community')}
                        <div className={styles.left_line} />
                        <div className={styles.right_line} />
                      </a>
                    </Link>
                    <Link href="/blog">
                      <a
                        data-menu-link
                        id="nav_pulseblog"
                        onClick={handleCloseMenu}
                        className="lg:mr-12"
                      >
                        {t('footer_pulse_blog')}
                        <div className={styles.left_line} />
                        <div className={styles.right_line} />
                      </a>
                    </Link>
                    <Link href="/business">
                      <a
                        data-menu-link
                        id="nav_forbusiness"
                        onClick={handleCloseMenu}
                        className={displayCart ? 'lg:mr-12' : ''}
                      >
                        {t('footer_oura_for_business')}
                        <div className={styles.left_line} />
                        <div className={styles.right_line} />
                      </a>
                    </Link>
                  </>
                )}

                {displayCart && (
                  <Link href="/cart">
                    <a className="hidden lg:block" data-cy="link-to-cart">
                      <ShoppingBag
                        count={cartCount}
                        inverse={isDeepScroll ? false : inverse}
                      />
                    </a>
                  </Link>
                )}
              </nav>

              <nav
                aria-hidden={isMinWidthLarge}
                data-cy={`mobile-menu-links ${
                  visible ? 'mobile-menu-links-open' : ''
                }`}
                className={styles.header__mobile_links}
              >
                <Link href="/terms-and-conditions">
                  <a onClick={handleCloseMenu}>
                    {t('header_terms_and_conditions')}
                  </a>
                </Link>
                <Link href="/privacy-policy">
                  <a onClick={handleCloseMenu}>{t('header_privacy_policy')}</a>
                </Link>
                <Link href="/accessibility">
                  <a onClick={handleCloseMenu}>{t('header_accessibility')}</a>
                </Link>
              </nav>

              {shopButton && (
                <div className={styles.header__desktop_controls}>
                  <ShopButton
                    inverse={inverse}
                    headerScrolled={isInitScroll || isDeepScroll}
                    data-cy="nav_shopcta"
                    label={shopButton.label}
                    link={shopButton.link || bilboProductPagePath}
                  />
                </div>
              )}
            </div>

            <div className={styles.header__mobile_controls}>
              {shopButton && (
                <div className={!hideLinks ? 'mr-8' : ''}>
                  <ShopButton
                    inverse={inverse}
                    headerScrolled={isInitScroll || isDeepScroll}
                    data-cy="mobile_nav_shopcta"
                    label={shopButton.label}
                    link={shopButton.link || bilboProductPagePath}
                  />
                </div>
              )}
              {displayCart && (
                <Link href="/cart">
                  <a
                    className={!hideLinks ? 'mr-4' : ''}
                    data-cy="link-to-cart"
                  >
                    <ShoppingBag
                      count={cartCount}
                      inverse={isDeepScroll ? false : inverse}
                    />
                  </a>
                </Link>
              )}
              {!hideLinks && (
                <HamburgerButton onClick={handleMobileToggle} open={visible} />
              )}
            </div>
          </Grid>
        </header>

        {showDiscountBanner && (
          <DiscountMessage
            hide={isDeepScroll}
            showBorder={bordered}
            hideBorder={scrolled}
          />
        )}
      </div>
    );
  },
);

export default Header;
