import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';
import { CONNECT_MODAL_ID } from '../data';

interface Props {
  location: string;
  text?: string;
  className?: string;
}

const ConnectButton = ({
  location,
  text = 'connect with us',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal } = useModalContext();

  const handleClick = () => {
    sendSegmentTrack({
      type: EventType.B2bModalOpened,
      payload: {
        cta: text,
        location,
        path: asPath,
      },
    });

    setActiveModal(CONNECT_MODAL_ID);
  };

  return (
    <Button className={className} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default ConnectButton;
