import { t } from '../../../public/locales/LocaleContext';
import Banner from '../../sormus/Banner';
import Button from '../../sormus/Button';
import { breakpoints } from '../../sormus/constants';
import Typography from '../../sormus/Typography';
import TypographyRhythm from '../../sormus/TypographyRhythm';
import { BUSINESS_CONTACT_US_LINK } from './BusinessSection';

console.log({ breakpoints });

const BusinessBanner = () => (
  <Banner
    maxViewportHeight
    contentLeft
    media={{
      type: 'image',
      src: 'business/banner_image.jpeg',
      responsiveImages: [
        {
          shortSrc: 'business/banner_image_mobile.jpeg',
          width: breakpoints.medium,
        },
        {
          shortSrc: 'business/banner_image.jpeg',
          width: 1800,
        },
      ],
      sizes: `(max-width: ${breakpoints.medium}px), 100vw`,
      alt: 'Oura for Business Banner',
    }}
  >
    <TypographyRhythm>
      <Typography variant="h2" color="white">
        {t('business_oura_for_business')}
      </Typography>
      <Typography color="white">{t('business_banner_subtitle')}</Typography>
    </TypographyRhythm>
    <Button
      variant="secondary"
      className="mt-8"
      target="_blank"
      link
      href={BUSINESS_CONTACT_US_LINK}
    >
      {t('business_contact_us')}
    </Button>
  </Banner>
);

export default BusinessBanner;
