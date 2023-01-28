import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { Button } from '../../../sormus';

interface Props {
  location: string;
  module: string;
  label?: MessageKey;
  onClick?: () => void;
}

const LearnMoreButton = ({
  label = 'business_button_learn_more_text',
  location,
  module,
  onClick,
}: Props): ReactElement => {
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
            module,
            path: asPath,
          },
        });

        if (typeof onClick === 'function') {
          onClick();
        }
      }}
    >
      {t(label)}
    </Button>
  );
};

export default LearnMoreButton;
