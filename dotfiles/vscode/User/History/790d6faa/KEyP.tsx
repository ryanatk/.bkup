import Link from 'next/link';
import { t } from '../../../../public/locales/LocaleContext';
import { BodyLink, Checkbox } from '../../../sormus';

interface TermsAgreementProps {
  onChange: () => void;
  checked: boolean;
  name?: string;
}

const TermsAgreement = ({
  onChange,
  checked,
  name = 'terms-agreement',
}: TermsAgreementProps) => {
  return (
    <Checkbox
      className="text-helsinkiBlue-dark"
      data-cy="checkbox-checkout-agreement"
      label={t('checkout_agreement', {
        privacy_link: (
          <Link href="/privacy-policy" passHref>
            <BodyLink color="inherit" target="_blank" rel="noopener noreferrer">
              {t('checkout_privacypolicy_link_text')}
            </BodyLink>
          </Link>
        ),
        terms_link: (
          <Link href="/terms-and-conditions" passHref>
            <BodyLink color="inherit" target="_blank" rel="noopener noreferrer">
              {t('checkout_termsandconditions_link_text')}
            </BodyLink>
          </Link>
        ),
      })}
      checked={checked}
      onChange={onChange}
      name={name}
    />
  );
};

export default TermsAgreement;
