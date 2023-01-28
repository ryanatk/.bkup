import { ReactElement, ReactNode } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';

// helper function to consistently format translations
const tx = (
  text: MessageKey,
  optionalValues: Record<string, ReactNode> = {},
): ReactElement =>
  t(text, {
    b(chunks: string[]) {
      return <b>{chunks}</b>;
    },
    br: <br />,

    // adding these last allows consumer to override defaults
    ...optionalValues,
  });

export default tx;
