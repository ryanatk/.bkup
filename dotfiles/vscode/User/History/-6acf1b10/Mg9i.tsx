import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { HealthJourneyBanner } from '../_global';
import { useModalContext } from './context/ModalContext';
import { CONNECT_MODAL_ID } from './data';

const BusinessFooterBanner = (): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal } = useModalContext();

  return (
    <HealthJourneyBanner
      className="lg:mb-6"
      title=""
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
    />
  );
};

export default BusinessFooterBanner;
