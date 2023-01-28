import { src } from '../../../../utils/imageHelpers';
import { QuoteCardProps } from '../../../sormus/QuoteCard';

const getSrc = (image: string) => src(image, 'jpg', 80);

const QUOTES: QuoteCardProps[] = [
  {
    text: 'pdp_horizon_quote_1_text',
    name: 'Ariana Huffington',
    title: 'Thrive Global',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-walker@2x'),
  },
  {
    text: 'pdp_horizon_quote_1_text',
    name: 'Matthew Walker',
    title: '@drmattwalker',
  },
];

export default QUOTES;
