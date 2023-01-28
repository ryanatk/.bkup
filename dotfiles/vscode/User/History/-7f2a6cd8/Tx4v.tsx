import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { srcSet } from '../../../../utils/imageHelpers';
import { Banner, Button, Typography } from '../../../sormus';

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
        src: srcSet('homepage/m-family-cta-bg@2x', 'jpg', [400, 600]).src,
        srcDesktop: srcSet(
          'homepage/d-family-cta-bg@2x',
          'jpg',
          [768, 1024, 1200, 1600, 2000],
        ).src,
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
