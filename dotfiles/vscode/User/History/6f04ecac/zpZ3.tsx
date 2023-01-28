import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';
import { Button } from '../../../sormus';
import ConnectModal from './ConnectModal';

interface Props {
  text?: string;
  className?: string;
}

const ConnectButton = ({
  text = 'connect with us',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();

  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    addScript(hubSpot, { onload: () => setIsHubSpotLoaded(true) });
    // don't clean up, so we only load scripts once
  }, [setIsHubSpotLoaded]);

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
    <>
      <Button className={className} onClick={handleClick}>
        {text}
      </Button>

      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default ConnectButton;
