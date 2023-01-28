import { t } from '../../../public/locales/LocaleContext';

// helper function to consistently format translations
const tx = (text) =>
  t(text, {
    br: <br />,
  });

export default tx;
