import { useRouter } from 'next/router';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';

const LearnMoreButton = () => {
  const { asPath } = useRouter();

  return (
    <Button
      link
      href="https://cloud.ouraring.com/v2/docs"
      target="_blank"
      className="mt-4"
      onClick={() => {
        sendSegmentTrack({
          type: EventType.CTAClicked,
          payload: {
            action: 'go to integration documentation',
            cta: 'learn more',
            location: 'body',
            module: 'integration',
            path: asPath,
          },
        });
      }}
    >
      Learn More
    </Button>
  );
};

export default LearnMoreButton;