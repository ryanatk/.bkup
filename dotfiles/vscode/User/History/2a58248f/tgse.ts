import { src } from '../../../../utils/imageHelpers';
import { QuoteCardProps } from '../../../sormus/QuoteCard';

// DRY helper
const getSrc = (image: string, format = 'jpg') => src(image, format, 80);

const QUOTES: QuoteCardProps[] = [
  {
    text: 'business_quote_ariana_huffington',
    name: 'Arianna Huffington',
    title: 'Thrive Global',
    avatarUrl: getSrc('business/avatar-ariana@2x', 'png'),
  },
  {
    text: 'business_quote_shane_heath',
    name: 'Shane Heath, Founder',
    title: 'MUD/WTR',
  },
];

export default QUOTES;
