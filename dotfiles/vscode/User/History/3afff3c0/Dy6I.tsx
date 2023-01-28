import { useLocale } from '../../public/locales/LocaleContext';
import de from './de';
import en from './en';

const Page = () => {
  const { selectedLocale } = useLocale();
  console.log({ selectedLocale });

  switch (selectedLocale) {
    case 'de':
      return de;
    default:
      return en;
  }
};

export default Page;
