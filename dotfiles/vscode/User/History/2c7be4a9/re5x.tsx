import Link from 'next/link';
import { getHelpUrl } from '../../../helpers/useLocalize';
import { t } from '../../../public/locales/LocaleContext';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import styles from './Footer.module.scss';

const FooterLink = ({ href, label, external = false }) => {
  return (
    <li className="my-6">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link href={href}>
          <a>{label}</a>
        </Link>
      )}
    </li>
  );
};

interface FooterLinksProps {
  textColor?: string;
}

const FooterLinks = ({ textColor }: FooterLinksProps) => {
  const isChargerSetHidden = checkFeatureFlag('hide-charger-set');
  const helpLocalizedUrl = getHelpUrl();

  return (
    <>
      <div className={`text-${textColor || 'helsinkiBlue'} ${styles.links_2}`}>
        <ul>
          <FooterLink href="/my-account" label={t('footer_my_account')} />
          <FooterLink href="/sizing" label={t('footer_sizing')} />
          {!isChargerSetHidden && (
            <FooterLink
              href="/product/charger-set"
              label={t('footer_extra_charger')}
            />
          )}
          <FooterLink href={helpLocalizedUrl} label={t('footer_help')} />
          <FooterLink
            href="https://cloud.ouraring.com/account/login?next=%2F"
            label={t('footer_oura_on_the_web')}
            external
          />
        </ul>
      </div>
      <div className={`text-${textColor || 'helsinkiBlue'} ${styles.links_3}`}>
        <ul>
          <FooterLink href="/about-us" label={t('footer_about_us')} />
          <FooterLink href="/press" label={t('footer_press')} />
          <FooterLink href="/careers" label={t('footer_careers')} />
          <FooterLink href="/contact" label={t('footer_contact')} />
        </ul>
      </div>
    </>
  );
};

export default FooterLinks;
