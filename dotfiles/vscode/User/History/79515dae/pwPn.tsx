import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Typography } from '../../sormus';
import QuoteSlider from '../../sormus/QuoteSlider';
import { PRODUCT_QUOTES } from './data';

const ProductQuotes = (): JSX.Element => {
  const { formatMessage } = useIntl();

  const quotes = useMemo(
    () =>
      PRODUCT_QUOTES.map(({ text, ...data }) => ({
        ...data,
        text: formatMessage({ id: text }),
      })),
    [formatMessage],
  );

  return (
    <div className="py-32">
      <Box>
        <Typography align="center" className="mb-16" variant="h2">
          <FormattedMessage
            id="pdp_horizon_quote_slider_title"
            values={{
              i(string) {
                return <em className="font-serif">{string}</em>;
              },
            }}
          />
        </Typography>
      </Box>

      <QuoteSlider quotes={quotes} />
    </div>
  );
};

export default ProductQuotes;
