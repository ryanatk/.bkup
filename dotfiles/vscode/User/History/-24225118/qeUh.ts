import { src } from '../../../../utils/imageHelpers';
import { LearnMoreBlockProps } from '../../../sormus/LearnMore';

const LEARN_MORE: LearnMoreBlockProps[] = [
  {
    image: {
      src: src('business/learn-sleep-score@2x', 'jpg', 500),
      alt: 'business_learn_more_sleep_alt',
    },
    title: 'business_learn_more_block_1_title',
    body: 'business_learn_more_block_1_body',
  },
  {
    image: {
      src: src('business/learn-activity-score@2x', 'jpg', 500),
      alt: 'business_learn_more_activity_alt',
    },
    title: 'business_learn_more_block_2_title',
    body: 'business_learn_more_block_2_body',
  },
  {
    image: {
      src: src('business/learn-readiness-score@2x', 'jpg', 500),
      alt: 'business_learn_more_readiness_alt',
    },
    title: 'business_learn_more_block_3_title',
    body: 'business_learn_more_block_3_body',
  },
];

export default LEARN_MORE;
