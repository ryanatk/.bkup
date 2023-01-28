import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';
// import { MessageKey } from '../../../public/locales/setup';

// helper function to consistently format translations
const tx = (
  // text: MessageKey
  text: string,
): ReactElement =>
  t(text, {
    br: <br />,
    // i(chunks: string[]) {
    //   return <i>{chunks}</i>;
    // },
  });

export default tx;
