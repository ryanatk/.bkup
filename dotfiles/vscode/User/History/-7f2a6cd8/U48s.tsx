import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { Banner, Button, Typography } from '../../../sormus';
import { breakpoints } from '../../../sormus/constants';

interface BilboGetYoursBannerProps {
  subcopy: string | JSX.Element;
  buttonText?: string | JSX.Element;
}

const BilboGetYoursBanner = ({
  subcopy,
  buttonText = t('claim_your_offer'),
}: BilboGetYoursBannerProps) => {
  const { asPath } = useRouter();

  const handleAnalytics = () => {
    sendGTMWithSegmentEvent({
      type: EventType.CTAClicked,
      payload: {
        cta: 'claim_your_offer',
        module: 'final_module',
        location: 'final_module',
        path: asPath,
      },
    });
  };

  return (
    <Banner
      media={{
        type: 'image',
        src: 'homepage/d-family-cta-bg@2x.jpg',
        responsiveImages: [
          {
            shortSrc: 'homepage/d-family-cta-bg@2x.jpg',
            width: breakpoints.medium,
          },
          {
            shortSrc: 'homepage/d-family-cta-bg@2x.jpg',
            width: 1800,
          },
        ],
        sizes: `(max-width: ${breakpoints.medium}px ${breakpoints.medium}px), 100vw`,
        loading: 'lazy',
      }}
    >
      <Typography Element="h2" variant="h3" color="white" className="mb-4">
        {t('bilbo_get_yours_banner_title')}
      </Typography>
      <Typography color="white" className="mb-6">
        {subcopy}
      </Typography>
      <Button
        variant="secondary"
        href="/product/heritage-silver"
        link={true}
        onClick={handleAnalytics}
      >
        {buttonText}
      </Button>
    </Banner>
  );
};

export default BilboGetYoursBanner;
