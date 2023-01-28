import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '../../sormus';
import QuoteSlider from '../../sormus/QuoteSlider';
import { PRODUCT_QUOTES } from './data';

const ProductQuotes = (): JSX.Element => {
  return (
    <div className="py-32">
      <Box>
        <Typography align="center" className="mb-16" variant="h2" Element="h1">
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

      <QuoteSlider quotes={PRODUCT_QUOTES} />
    </div>
  );
};

export default ProductQuotes;
