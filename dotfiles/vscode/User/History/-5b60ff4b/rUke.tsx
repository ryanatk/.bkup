import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Banner, Button, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';

export const CallToAction = () => {
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

  const matchDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.medium}px)`,
  );

  const image = `ad/call-to-action-img-${
    matchDesktopScreen ? 'desktop' : 'mobile'
  }`;

  return (
    <Banner
      media={{
        type: 'image',
        src: src(image, 'jpg', breakpoints.medium),
        srcDesktop: src(image, 'jpg'),
      }}
    >
      <div className="text-center md:text-left">
        <Typography Element="h6" variant="h3" color="white" className="md:mb-4">
          {t('call_to_action_title')}
        </Typography>
        <Typography Element="h6" variant="h3" color="white" className="mb-6">
          {t('call_to_action_title_2', {
            action: t('buy'),
          })}
        </Typography>
        <Button
          variant="secondary"
          href="/product/heritage-silver"
          link={true}
          onClick={handleAnalytics}
        >
          {t('call_to_action_button_text')}
        </Button>
      </div>
    </Banner>
  );
};

export default CallToAction;
