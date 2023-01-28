import { IntlSlideshowItem } from '../../../../hooks/useSlideshowItems';
import { t } from '../../../../public/locales/LocaleContext';
import IconCalendar from '../../../../svg/icon-calendar.svg';
import IconCheck from '../../../../svg/icon-check.svg';
import IconTemperature from '../../../../svg/icon-temperature.svg';
import { src } from '../../../../utils/imageHelpers';
import { breakpoints } from '../../../sormus/constants';
import { Slide } from '../components';

const WIDTH = breakpoints.medium;

const CYCLE_SLIDESHOW_ITEMS: IntlSlideshowItem[] = [
  {
    src: src('experience/d-oe-pp-5050-carousel-img-01@2x', 'jpg', WIDTH),
    mobileSrc: src('experience/m-oe-pp-5050-carousel-img-01@2x', 'jpg', WIDTH),
    alt: 'experience_readiness_slide_1_alt',
    content: () =>
      Slide({
        icon: IconTemperature,
        title: t('experience_cycle_slide_1_title'),
        paragraphs: [t('experience_cycle_slide_1_body')],
      }),
  },
  {
    shortSrc: 'experience/d-oe-pp-5050-carousel-img-02@2x.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: () =>
      Slide({
        icon: IconCalendar,
        title: t('experience_cycle_slide_2_title'),
        paragraphs: [t('experience_cycle_slide_2_body')],
      }),
  },
  {
    shortSrc: 'experience/d-oe-pp-5050-carousel-img-03@2x.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: () =>
      Slide({
        icon: IconCheck,
        title: t('experience_cycle_slide_3_title'),
        paragraphs: [t('experience_cycle_slide_3_body')],
      }),
  },
];

export default CYCLE_SLIDESHOW_ITEMS;
