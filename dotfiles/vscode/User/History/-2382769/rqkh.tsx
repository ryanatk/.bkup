import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import {
  getMessagesForLocale,
  LocaleMessagesJson,
  LocaleSupported,
  MessageKey,
} from './setup';
interface LocaleProps {
  selectedLocale: LocaleSupported;
}

const Locale = createContext<LocaleProps | undefined>(undefined);

export function useLocaleValues(locale: LocaleSupported | undefined) {
  if (!locale) locale = 'en';
  const [messages, setMessages] = useState<LocaleMessagesJson>();
  useEffect(() => {
    async function changeLocaleLoaded() {
      const messagesForLocale = await getMessagesForLocale(locale);
      // @ts-ignore
      setMessages(messagesForLocale);
    }
    changeLocaleLoaded();
  }, [locale]);

  return {
    selectedLocale: locale,
    messages,
  };
}

const getKeyByValue = (object: LocaleMessagesJson, value: string) =>
  Object.keys(object).find((key) => object[key] === value) as MessageKey;

/* 
  finds the first lokalized key by its value and returns a translated message 
*/
type LocaleObjType = {
  renderedString: JSX.Element | string;
};

export const useFormatMessageFromValue = (value: string) => {
  const localeObj: LocaleObjType = {
    renderedString: value,
  };

  const { messages } = useLocaleValues('en');

  if (messages && value) {
    const key = getKeyByValue(messages, value);
    if (key) {
      localeObj.renderedString = t(key);
    }
  }

  return localeObj.renderedString;
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { messages, selectedLocale } = useLocaleValues(
    locale as LocaleSupported,
  );
  if (!messages || !selectedLocale) return null;
  return (
    <Locale.Provider value={{ selectedLocale }}>
      <IntlProvider
        onError={(err) => {
          if (
            err.code === 'MISSING_TRANSLATION' ||
            err.code === 'MISSING_DATA'
          ) {
            console.error('Error:', err.message);
            return;
          }
          throw err;
        }}
        messages={messages}
        locale={selectedLocale}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </Locale.Provider>
  );
}
/**
 * This is built over React-Intl's <FormattedMessage /> for convenience
 * @example
 * t("guide_infotext_sleep_score")
 */
export function t(id: MessageKey, values?: Record<string, ReactNode>) {
  return <FormattedMessage id={id} values={values} />;
}

export function getCurrencyForLocale(locale: LocaleSupported) {
  switch (locale) {
    case 'en':
      return 'USD';
    case 'de':
      return 'EUR';
    case 'fi':
      return 'EUR';
    case 'eu':
      return 'EUR';
    case 'us':
      return 'USD';
    default:
      throw new Error('Language not supported');
  }
}
