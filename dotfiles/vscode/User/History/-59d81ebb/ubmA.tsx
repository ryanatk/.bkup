import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, Ref, useEffect, useState } from 'react';
import { ACTIVE_EXPERIMENT_ID as MEMBERSHIP_EXPERIMENT_ID } from '../../../consts/experiments/membership';
import { useHeaderContext } from '../../../contexts/HeaderContext';
import { getHelpUrl } from '../../../helpers/useLocalize';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { breakpoints } from '../constants';
import DiscountMessage from '../DiscountMessage';
import Eyebrow from '../Eyebrow';
import GoogleOptimize, { VariantId } from '../GoogleOptimize';
import Grid from '../Grid';
import VectorImage from '../VectorImage';
import CartButton from './CartButton';
import HamburgerButton from './HamburgerButton';
import useStickyHeader from './hooks/useStickyHeader';
import styles from './HorizonHeader.module.scss';
import { HeaderProps } from './index';
import NavLink from './NavLink';
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
  const helpLocalizedUrl = getHelpUrl();
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
      <div className={styles.wrapperBlur} aria-hidden="true" />
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
                <div
                  className={cx(styles.offcanvas, {
                    [styles['offcanvas--open']]:
                      offcanvasOpen && !matchLargeScreen,
                  })}
                  aria-hidden={!matchLargeScreen && !offcanvasOpen}
                  data-cy={`nav_offcanvas_${offcanvasOpen ? 'open' : 'closed'}`}
                >
                  <nav
                    className={styles.mainNav}
                    data-cy="nav_main"
                    aria-label="Main"
                  >
                    <ul className={styles.navLinks}>
                      <GoogleOptimize
                        experimentId={MEMBERSHIP_EXPERIMENT_ID}
                        featureFlag="new-membership-page"
                        variant={VariantId.Two}
                        segmentEventProps={{
                          experimentName: 'New membership page',
                        }}
                      >
                        <NavLink href="/membership" id="nav_membership">
                          {t('header_membership')}
                        </NavLink>
                      </GoogleOptimize>
                      <NavLink href="/oura-experience" id="nav_ouraexperience">
                        {t('header_oura_experience')}
                      </NavLink>
                      <NavLink
                        href="https://ouraring.com/blog"
                        id="nav_pulseblog"
                        locale="en"
                      >
                        {t('header_the_pulse_blog')}
                      </NavLink>
                      <NavLink href="/business" id="nav_forbusiness">
                        {t('header_oura_for_business')}
                      </NavLink>
                    </ul>
                  </nav>
                  <nav
                    className={styles.utilityNav}
                    aria-label="Utility"
                    data-cy="nav_utility"
                  >
                    <ul>
                      <li>
                        <Link href="/my-account" passHref>
                          <a>{t('footer_my_account')}</a>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="https://cloud.ouraring.com/user/sign-in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('footer_oura_on_the_web')}
                        </a>
                      </li>
                      <li>
                        <Link href={helpLocalizedUrl} passHref>
                          <a>{t('footer_help')}</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <ShopButton
                    data-cy="mobile_nav_shopcta"
                    inverse={isInverse}
                    variant="primary"
                    size="large"
                    className="w-full lg:hidden"
                    {...shopButton}
                  />
                </div>
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
