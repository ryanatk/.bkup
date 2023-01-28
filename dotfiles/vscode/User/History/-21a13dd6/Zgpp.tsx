import { ReactElement } from 'react';
import Updated from '../../components/pages/privacy-policy-oura-health/2023';
import { useLocale } from '../../public/locales/LocaleContext';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import DE from './de';
import EN from './en';
import ES from './es';
import FI from './fi';

const PrivacyPolicyOuraHealth = (): ReactElement => {
  const { selectedLocale } = useLocale();
  const isUpdatedPrivacyPolicy = checkFeatureFlag('updated-privacy-policy');

  if (isUpdatedPrivacyPolicy) {
    return <Updated />;
  }

  switch (selectedLocale) {
    case 'de':
      return <DE />;
    case 'es':
      return <ES />;
    case 'fi':
      return <FI />;
    default:
      return <EN />;
  }
};

export default PrivacyPolicyOuraHealth;
