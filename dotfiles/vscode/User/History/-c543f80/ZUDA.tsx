import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import usePdpDiscountData, {
  PdpDiscountData,
} from '../../../helpers/discounts/usePdpDiscountData';
import { MessageKey } from '../../../public/locales/setup';
import { getCurrencySelector } from '../../../stores/app/selectors';
import { getDiscountsSelector } from '../../../stores/discounts/selectors';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getCurrencySymbol from '../../../utils/getCurrencySymbol';
import getDiscountMessage from '../../../utils/getDiscountMessage';
import { reportBadExperience } from '../../../utils/reportMetrics';
import Box from '../Box';
import Typography from '../Typography';
import styles from './DiscountMessage.module.scss';

export const formatDiscountMessage = (
  discountData: PdpDiscountData,
  message: MessageKey,
  currencyCode: string,
) => {
  const { formatMessage } = useIntl();
  const f = (id: MessageKey) => formatMessage({ id });
  const { discountPercentage, discountAmountText, price } = discountData;

  if (!message) return null;

  if (discountPercentage) {
    const percentString = `${discountPercentage}%`;
    const formattedMessage = f(message)?.replace('{amount}', percentString);
    return formattedMessage;
  }

  if (discountAmountText) {
    const formattedMessage = f(message)?.replace(
      '{amount}',
      getCurrencySymbol(currencyCode) + price,
    );
    return formattedMessage;
  }

  return f(message);
};

const DiscountMessage = ({ hide, showBorder, hideBorder }) => {
  const currencyCode = useSelector(getCurrencySelector);
  const pdpDiscountData = usePdpDiscountData();
  const discountsState = useSelector(getDiscountsSelector);
  const isRAFMessageEnabled = checkFeatureFlag('enable-raf-messaging');
  const oneMonthEnabled = checkFeatureFlag('one-month-free-membership');

  const { errorType } = pdpDiscountData;

  if (errorType) reportBadExperience(errorType);
  const discountMessage = getDiscountMessage(
    pdpDiscountData,
    discountsState,
    isRAFMessageEnabled,
    oneMonthEnabled,
  );

  const displayMessage = formatDiscountMessage(
    pdpDiscountData,
    discountMessage,
    currencyCode,
  );

  if (displayMessage) {
    return (
      <div
        data-cy="banner-message"
        className={`${styles.banner} ${hide ? styles.hideBanner : ''}`}
      >
        <Box>
          <Typography variant="eyebrow" weight="normal">
            <span data-cy="discount-message-text">{displayMessage}</span>
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <Box
      className={`transition-opacity ${
        showBorder && 'border-t border-helsinkiBlue'
      } ${hideBorder && 'opacity-0'}`}
    />
  );
};

export default DiscountMessage;
