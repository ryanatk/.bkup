import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';
import { MODAL_ID, useModalContext } from '../context/ModalContext';

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

    setActiveModal(MODAL_ID.CONNECT);
  };

  return (
    <Button className={className} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default ConnectButton;
