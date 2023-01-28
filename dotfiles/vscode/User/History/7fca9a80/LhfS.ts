import { t } from '../../../../public/locales/LocaleContext';
import IconReadiness from '../../../../svg/icon-readiness-oe.svg';
import IconRest from '../../../../svg/icon-rest.svg';
import IconZzz from '../../../../svg/icon-zzz.svg';
import { Slide } from '../components';

const READINESS_SLIDESHOW_ITEMS = [
  {
    shortSrc: 'experience/d-oe-readiness-5050-carousel-img-01@2x.jpg',
    width: 600,
    alt: 'Man with Oura stealth ring on index finger',
    content: (): JSX.Element =>
      Slide({
        icon: IconReadiness,
        title: t('experience_readiness_slide_1_title'),
        paragraphs: [t('experience_readiness_slide_1_body')],
      }),
  },
  {
    shortSrc: 'experience/d-oe-readiness-5050-carousel-img-02@2x.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: (): JSX.Element =>
      Slide({
        icon: IconRest,
        title: t('experience_readiness_slide_2_title'),
        paragraphs: [t('experience_readiness_slide_2_body')],
      }),
  },
  {
    shortSrc: 'experience/d-oe-readiness-5050-carousel-img-01@2x.jpg',
    width: 600,
    alt: 'Woman with Oura silver ring on index finger',
    content: (): JSX.Element =>
      Slide({
        icon: IconZzz,
        title: t('experience_readiness_slide_3_title'),
        paragraphs: [t('experience_readiness_slide_3_body')],
      }),
  },
];

export default READINESS_SLIDESHOW_ITEMS;
