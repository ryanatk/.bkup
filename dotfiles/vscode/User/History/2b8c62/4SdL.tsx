import cx from 'classnames';
import { ReactElement } from 'react';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';

interface Props {
  modalId: string;
  text?: string;
  className?: string;
}

const ContactButton = ({
  modalId,
  text = 'contact us',
  className,
}: Props): ReactElement => {
  const { setActiveModal, isHubSpotLoaded } = useModalContext();

  const handleClick = () => {
    setActiveModal(modalId);
  };

  return (
    <Button
      className={cx(className, 'whitespace-nowrap capitalize', {
        invisible: !isHubSpotLoaded,
      })}
      size="small"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ContactButton;
