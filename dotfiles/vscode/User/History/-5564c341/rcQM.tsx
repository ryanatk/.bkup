import { ReactElement, ReactNode } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';

// helper function to consistently format translations
const tx = (
  text: MessageKey,
  optionalValues: Record<string, ReactNode> = {},
): ReactElement =>
  t(text, {
    // in brackets
    br: <br />,

    // HTML tags
    b(chunks: string[]) {
      return <b>{chunks}</b>;
    },

    // adding overrides last allows consumer to override defaults
    ...optionalValues,
  });

export default tx;
