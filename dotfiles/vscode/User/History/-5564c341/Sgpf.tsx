import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';

// helper function to consistently format translations
const tx = (text): ReactElement =>
  t(text, {
    br: <br />,
  });

export default tx;
