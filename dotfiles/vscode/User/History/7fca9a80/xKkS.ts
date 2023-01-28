import { IntlSlideshowItem } from '../../../../hooks/useSlideshowItems';
import { t } from '../../../../public/locales/LocaleContext';
import IconReadiness from '../../../../svg/icon-readiness-oe.svg';
import IconRest from '../../../../svg/icon-rest.svg';
import IconZzz from '../../../../svg/icon-zzz.svg';
import { src } from '../../../../utils/imageHelpers';
import { breakpoints } from '../../../sormus/constants';
import { Slide } from '../components';

const get = (image) => src(image, 'jpg', breakpoints.medium);

const READINESS_SLIDESHOW_ITEMS: IntlSlideshowItem[] = [
  {
    src: get('experience/d-oe-readiness-5050-carousel-img-01@2x'),
    mobileSrc: get('experience/m-oe-readiness-5050-carousel-img-01@2x'),
    alt: 'experience_readiness_slide_1_alt',
    content: (): JSX.Element =>
      Slide({
        icon: IconReadiness,
        title: t('experience_readiness_slide_1_title'),
        paragraphs: [t('experience_readiness_slide_1_body')],
      }),
  },
  {
    src: get('experience/d-oe-readiness-5050-carousel-img-02@2x'),
    mobileSrc: get('experience/m-oe-readiness-5050-carousel-img-02@2x'),
    alt: 'experience_readiness_slide_2_alt',
    content: (): JSX.Element =>
      Slide({
        icon: IconRest,
        title: t('experience_readiness_slide_2_title'),
        paragraphs: [t('experience_readiness_slide_2_body')],
      }),
  },
  {
    src: get('experience/d-oe-readiness-5050-carousel-img-03@2x'),
    mobileSrc: get('experience/m-oe-readiness-5050-carousel-img-03@2x'),
    alt: 'experience_readiness_slide_3_alt',
    content: (): JSX.Element =>
      Slide({
        icon: IconZzz,
        title: t('experience_readiness_slide_3_title'),
        paragraphs: [t('experience_readiness_slide_3_body')],
      }),
  },
];

export default READINESS_SLIDESHOW_ITEMS;
