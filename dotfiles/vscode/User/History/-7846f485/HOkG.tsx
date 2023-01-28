import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { Button } from '../../../sormus';

interface Props {
  location: string;
}

const LearnMoreButton = ({ location }: Props): ReactElement => {
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
            location,
            module: 'integration',
            path: asPath,
          },
        });
      }}
    >
      {t('business_button_learn_more_text')}
    </Button>
  );
};

export default LearnMoreButton;
