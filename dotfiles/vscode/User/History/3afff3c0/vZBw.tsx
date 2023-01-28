import { useLocale } from '../../public/locales/LocaleContext';
import DE from './de';
import EN from './en';
import ES from './es';
import FI from './fi';

const Page = () => {
  const { selectedLocale } = useLocale();

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

export default Page;
