import { ReactElement } from 'react';
import { useLocale } from '../../public/locales/LocaleContext';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import Updated from './2023';
import DE from './de';
import EN from './en';
import ES from './es';
import FI from './fi';

const PrivacyPolicyOuraHealth = (): ReactElement => {
  const { selectedLocale } = useLocale();
  const isUpdatedPrivacyPolicy = checkFeatureFlag('updated-privacy-policy');

  if (isUpdatedPrivacyPolicy) {
    <Updated />;
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
