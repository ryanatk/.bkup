import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';

interface Props {
  id: string;
  text?: string;
  className?: string;
}

const ConnectButton = ({
  id,
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
        location: 'hero',
        path: asPath,
      },
    });

    setActiveModal(id);
  };

  return (
    <Button className={className} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default ConnectButton;
