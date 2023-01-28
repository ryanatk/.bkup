import { t } from '../../../../public/locales/LocaleContext';
import IconCalendar from '../../../../svg/design-tokens/icon_calendar.svg';
import IconCheck from '../../../../svg/design-tokens/icon_checkmark_large.svg';
import IconTemperature from '../../../../svg/design-tokens/icon_temperature.svg';
import { Slide } from '../components';

const CYCLE_SLIDESHOW_ITEMS = [
  {
    shortSrc: 'experience/d-oe-pp-5050-carousel-img-01@2x.jpg',
    width: 600,
    alt: 'Man with Oura stealth ring on index finger',
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
