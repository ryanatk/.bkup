import { useLocale } from '../../public/locales/LocaleContext';
import DE from './de';
import EN from './en';

const Page = () => {
  const { selectedLocale } = useLocale();
  console.log({ selectedLocale });

  switch (selectedLocale) {
    case 'de':
      return <DE />;
    default:
      return <EN />;
  }
};

export default Page;
