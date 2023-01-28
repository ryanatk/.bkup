import { src } from '../../../../utils/imageHelpers';
import { QuoteCardProps } from '../../../sormus/QuoteCard';

const getSrc = (image: string) => src(image, 'jpg', 80);

const QUOTES: QuoteCardProps[] = [
  {
    text: 'business_quote_ariana_huffington',
    name: 'Ariana Huffington',
    title: 'Thrive Global',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-walker@2x'), // TODO: update image
  },
  {
    text: 'business_quote_shane_heath_text',
    name: 'Shane Heath, Founder',
    title: 'MUD/WTR',
  },
];

export default QUOTES;
