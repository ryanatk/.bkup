import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { src } from '../../../utils/imageHelpers';
import { HealthJourneyBanner } from '../_global';
import { CONNECT_MODAL_ID } from './const';
import { useModalContext } from './context/ModalContext';

const BusinessFooterBanner = (): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal } = useModalContext();

  return (
    <HealthJourneyBanner
      className="lg:mb-6"
      title="business_footer_banner_title"
      cta="business_button_connect_text"
      ctaProps={{
        onClick: () => {
          sendSegmentTrack({
            type: EventType.B2bModalOpened,
            payload: {
              cta: 'connect with us',
              location: 'footer',
              path: asPath,
            },
          });

          setActiveModal(CONNECT_MODAL_ID);
        },
      }}
      mobileImage={src('m-contact-banner-img@2x', 'jpg', 1024)}
      desktopImage={src('d-contact-banner-img@2x', 'jpg', 2000)}
    />
  );
};

export default BusinessFooterBanner;
