import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';

// helper function to consistently format translations
const tx = (text: MessageKey): ReactElement =>
  t(text, {
    br: <br />,
  });

export default tx;
