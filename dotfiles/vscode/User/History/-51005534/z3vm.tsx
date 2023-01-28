import cx from 'classnames';
import Link from 'next/link';
import { forwardRef, ReactElement } from 'react';
import { ACTIVE_EXPERIMENT_ID as MEMBERSHIP_EXPERIMENT_ID } from '../../../../consts/experiments/membership';
import { getHelpUrl } from '../../../../helpers/useLocalize';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { t } from '../../../../public/locales/LocaleContext';
import { breakpoints } from '../../constants';
import GoogleOptimize, { VariantId } from '../../GoogleOptimize';
import styles from './HeaderLinks.module.scss';
import NavLink from './NavLink';
import ShopButton from './ShopButton';

interface Props {
  offcanvasOpen: boolean;
  isInverse: boolean;
  ref: React.ReactElement;
  shopButton?:
    | {
        label: React.ReactElement | React.ReactFragment | string | false;
        link?: string;
        target?: '_blank' | undefined;
      }
    | false;
}

const HeaderLinks = forwardRef<HTMLDivElement, Props>(function HeaderLinks(
  { offcanvasOpen, isInverse, shopButton }: Props,
  ref,
): ReactElement {
  const matchLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const helpLocalizedUrl = getHelpUrl();

  return (
    <div
      className={cx(styles.offcanvas, {
        [styles.offcanvasOpen]: offcanvasOpen && !matchLargeScreen,
      })}
      aria-hidden={!matchLargeScreen && !offcanvasOpen}
      data-cy={`nav_offcanvas_${offcanvasOpen ? 'open' : 'closed'}`}
      ref={ref}
    >
      <nav className={styles.mainNav} data-cy="nav_main" aria-label="Main">
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
  );
});

export default HeaderLinks;
