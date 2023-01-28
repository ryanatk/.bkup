import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { loadLocaleMessages } from '../../utils/loadLocaleMessages';
import { LocaleMessagesJson, LocaleSupported, MessageKey } from './setup';
interface LocaleProps {
  selectedLocale: LocaleSupported;
}

const Locale = createContext<LocaleProps | undefined>(undefined);

export function useLocaleValues(locale: LocaleSupported) {
  if (!locale) locale = 'en';

  const [messages, setMessages] = useState<LocaleMessagesJson>(null);

  useEffect(() => {
    async function changeLocaleLoaded() {
      const messagesForLocale = await loadLocaleMessages(locale);
      // @ts-ignore
      setMessages(messagesForLocale);
    }
    changeLocaleLoaded();
  }, [locale]);

  return {
    selectedLocale: locale,
    messages: messages || ({} as LocaleMessagesJson),
    isLoading: messages == null,
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

// Deprecated. Don't use useFormatMessageFromValue, it's going to be deleted soon.
// If you're displaying a translated string then you should have the 'key'
// some other way, without doing a reverse lookup. -andyf

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
  const { messages, selectedLocale, isLoading } = useLocaleValues(
    locale as LocaleSupported,
  );

  return (
    <Locale.Provider value={{ selectedLocale }}>
      <IntlProvider
        onError={(err) => {
          if (isLoading) {
            // Ignore errors if the messages data hasn't fully loaded yet.
            return;
          }

          if (
            err.code === 'MISSING_TRANSLATION' ||
            err.code === 'MISSING_DATA'
          ) {
            console.error('Translation error:', err.message);
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

export const useLocale = (): LocaleProps => useContext(Locale);

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
