import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';
import { CONNECT_MODAL_ID } from '../data';

interface Props {
  location: string;
  text?: MessageKey;
  className?: string;
}

const ConnectButton = ({
  location,
  text = 'business_button_connect_text',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal } = useModalContext();

  const handleClick = () => {
    sendSegmentTrack({
      type: EventType.B2bModalOpened,
      payload: {
        cta: 'connect with us',
        location,
        path: asPath,
      },
    });

    setActiveModal(CONNECT_MODAL_ID);
  };

  return (
    <Button className={className} onClick={handleClick}>
      {t(text)}
    </Button>
  );
};

export default ConnectButton;
