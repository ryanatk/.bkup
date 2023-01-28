import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import usePdpDiscountData from '../../../../helpers/discounts/usePdpDiscountData';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { useFeatureFlag } from '../../../../queries/FeaturesConfig';
import {
  getCountryCodeSelector,
  getCurrencySelector,
} from '../../../../stores/app/selectors';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import getCohort, {
  BilboCohorts,
  UPGRADER,
} from '../../../../utils/getBilboCohort';
import getCurrencySymbol from '../../../../utils/getCurrencySymbol';
import { BodyLink } from '../../../sormus';
import Box from '../../../sormus/Box';
import { List, ListItem } from '../../../sormus/List';
import styles from './BilboLegalFootnotes.module.scss';

const WORKOUT_HEART_RATE_FOOTNOTE = t('footnote_workout_heartrate');
const HOW_ACCURATE_FOOTNOTE = (
  <BodyLink
    href="//ouraring.com/blog/how-accurate-is-oura/"
    target="_blank"
    rel="noopener noreferrer"
  >
    {t('footnote_oura_accuracy')}
  </BodyLink>
);

const SPO2_FOOTNOTE = t('footnote_spo2');
const AFFIRM_FOOTNOTE_TEXT = t('footnote_affirm');
const SLEEP_ALGORITHM_FOOTNOTE = t('footnote_sleep_algorithm');
const AFFIRM_FOOTNOTE = [
  {
    marker: '†',
    footnote: AFFIRM_FOOTNOTE_TEXT,
  },
];
const WARRANTY_FOOTNOTE = [
  {
    marker: '*',
    footnote: (
      <BodyLink
        href="//ouraring.com/terms-and-conditions"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('footnote_warranty')}
      </BodyLink>
    ),
  },
];

const HOME = 'home';
const HOME_VARIANT = 'home_variant';
const PDP = 'pdp';
const CART = 'cart';

const HOMEPAGE = [
  {
    marker: '1',
    footnote: SLEEP_ALGORITHM_FOOTNOTE,
  },
  {
    marker: '*',
    footnote: HOW_ACCURATE_FOOTNOTE,
  },
];

const HOMEPAGE_VARIANT = [
  {
    marker: '1',
    footnote: SLEEP_ALGORITHM_FOOTNOTE,
  },
  {
    marker: '*',
    footnote: HOW_ACCURATE_FOOTNOTE,
  },
];

const PDP_PREORDER = [
  {
    marker: '1',
    footnote: SPO2_FOOTNOTE,
  },
];

const CARTPAGE = [];

const MOTHERS_DAY = {
  marker: '**',
  footnote: t('footnote_mothers_day'),
};

interface BilboLegalFootnotesProps {
  pageName: 'home' | 'home_variant' | 'pdp' | 'cart';
}

const BilboLegalFootnotes = ({ pageName }: BilboLegalFootnotesProps) => {
  const { campaign } = usePdpDiscountData();
  const cohort = getCohort(campaign);
  const { enabled: affirmEnabled } = useFeatureFlag('show-affirm');
  const countryCode = useSelector(getCountryCodeSelector);
  const { formatMessage } = useIntl();
  const f = (id: MessageKey) => formatMessage({ id });
  const extendedWarrantyFlag = checkFeatureFlag('extended-warranty');
  const mothersDayEnabled = checkFeatureFlag('mothers-day-2022');

  const getFootnotes = (
    pageName: 'home' | 'home_variant' | 'pdp' | 'cart',
    cohort: BilboCohorts,
    affirmFootnote?: boolean,
    formatFn?: (string: MessageKey) => string,
  ) => {
    const currencyCode = useSelector(getCurrencySelector);
    const currencySymbol = getCurrencySymbol(currencyCode);

    if (pageName === HOME) {
      const homeNotes = [].concat(HOMEPAGE);
      if (mothersDayEnabled) homeNotes.push(MOTHERS_DAY);
      return homeNotes;
    }
    if (pageName === HOME_VARIANT) {
      const homeVariantNotes = [].concat(HOMEPAGE_VARIANT);
      if (mothersDayEnabled) homeVariantNotes.push(MOTHERS_DAY);
      return homeVariantNotes;
    }
    if (pageName === CART) {
      const cartNotes = [].concat(CARTPAGE);
      if (affirmFootnote) cartNotes.push(...AFFIRM_FOOTNOTE);
      if (!extendedWarrantyFlag) cartNotes.push(...WARRANTY_FOOTNOTE);
      return cartNotes;
    }
    if (pageName === PDP) {
      const preorderNotes = [].concat(PDP_PREORDER);
      if (affirmFootnote) preorderNotes.push(...AFFIRM_FOOTNOTE);
      return preorderNotes;
    }
    return null;
  };

  const showAffirmFootnote =
    cohort !== UPGRADER && countryCode === 'US' && affirmEnabled;

  const footnotes = getFootnotes(pageName, cohort, showAffirmFootnote, f);

  if (!footnotes) return null;

  return (
    <div
      id="legal-footnotes"
      data-cy="legal-footnotes"
      className={styles.BilboLegalFootnotes}
    >
      <Box>
        <List type="ol" unstyled className={styles.BilboLegalFootnotes__List}>
          {footnotes.map(({ marker, footnote }, index) => (
            <ListItem
              data-marker={marker}
              key={`footnote-${index}`}
              color="helsinkiBlue-light"
            >
              {footnote}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default BilboLegalFootnotes;
