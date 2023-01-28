import { src } from '../../../../utils/imageHelpers';
import { LearnMoreBlockProps } from '../../../sormus/LearnMore';

const learnMoreData: LearnMoreBlockProps[] = [
  {
    image: {
      src: src('simple-home/home-about-oura-01@2x', 'jpg', 500),
      alt: 'simple_home_learn_more_block_1_image_alt',
    },
    title: 'simple_home_learn_more_block_1_title',
    body: 'simple_home_learn_more_block_1_body',
  },
  {
    image: {
      src: src('simple-home/home-about-oura-02@2x', 'jpg', 500),
      alt: 'simple_home_learn_more_block_2_image_alt',
    },
    title: 'simple_home_learn_more_block_2_title',
    body: 'simple_home_learn_more_block_2_body',
  },
  {
    image: {
      src: src('simple-home/home-about-oura-03@2x', 'jpg', 500),
      alt: 'simple_home_learn_more_block_3_image_alt',
    },
    title: 'simple_home_learn_more_block_3_title',
    body: 'simple_home_learn_more_block_3_body',
  },
];

export default learnMoreData;
