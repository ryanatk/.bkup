import { IntlSlideshowItem } from '../../../../hooks/useSlideshowItems';
import { t } from '../../../../public/locales/LocaleContext';
import IconCalendar from '../../../../svg/icon-calendar.svg';
import IconCheck from '../../../../svg/icon-check.svg';
import IconTemperature from '../../../../svg/icon-temperature.svg';
import { src } from '../../../../utils/imageHelpers';
import { breakpoints } from '../../../sormus/constants';
import { Slide } from '../components';

// DRY helper
const getSrc = (image: string) => src(image, 'jpg', breakpoints.medium);

const CYCLE_SLIDESHOW_ITEMS: IntlSlideshowItem[] = [
  {
    src: getSrc('experience/d-oe-pp-5050-carousel-img-01@2x'),
    mobileSrc: getSrc('experience/m-oe-pp-5050-carousel-img-01@2x'),
    alt: 'experience_cycle_slide_1_alt',
    content: () =>
      Slide({
        icon: IconTemperature,
        title: t('experience_cycle_slide_1_title'),
        paragraphs: [t('experience_cycle_slide_1_body')],
      }),
  },
  {
    src: getSrc('experience/d-oe-pp-5050-carousel-img-02@2x'),
    mobileSrc: getSrc('experience/m-oe-pp-5050-carousel-img-02@2x'),
    alt: 'experience_cycle_slide_2_alt',
    content: () =>
      Slide({
        icon: IconCalendar,
        title: t('experience_cycle_slide_2_title'),
        paragraphs: [t('experience_cycle_slide_2_body')],
      }),
  },
  {
    src: getSrc('experience/d-oe-pp-5050-carousel-img-03@2x'),
    mobileSrc: getSrc('experience/m-oe-pp-5050-carousel-img-03@2x'),
    alt: 'experience_cycle_slide_3_alt',
    content: () =>
      Slide({
        icon: IconCheck,
        title: t('experience_cycle_slide_3_title'),
        paragraphs: [t('experience_cycle_slide_3_body')],
      }),
  },
];

export default CYCLE_SLIDESHOW_ITEMS;
