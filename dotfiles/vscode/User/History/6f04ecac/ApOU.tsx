import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';

interface Props {
  text?: string;
  className?: string;
}

const ConnectButton = ({
  text = 'connect with us',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    sendSegmentTrack({
      type: EventType.B2bModalOpened,
      payload: {
        cta: text,
        location: 'hero',
        path: asPath,
      },
    });

    setIsModalOpen(true);
  };

  return (
    <Button className={className} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default ConnectButton;
