import { t } from '../../../../public/locales/LocaleContext';
import { Slide } from '../components';

const CYCLE_SLIDESHOW_ITEMS = [
  {
    shortSrc: 'experience/d-oe-pp-5050-carousel-img-01@2x.jpg',
    width: 600,
    alt: 'Man with Oura stealth ring on index finger',
    content: () =>
      Slide({
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
        title: t('experience_cycle_slide_3_title'),
        paragraphs: [t('experience_cycle_slide_3_body')],
      }),
  },
];

export default CYCLE_SLIDESHOW_ITEMS;
