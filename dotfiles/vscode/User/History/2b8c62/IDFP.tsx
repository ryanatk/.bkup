import cx from 'classnames';
import { ReactElement } from 'react';
import { Button } from '../../../sormus';

interface Props {
  id: string;
  text?: string;
  className?: string;
  setActiveModal: (id: string) => void;
}

const ContactButton = ({
  id,
  text = 'contact us',
  className,
  setActiveModal,
}: Props): ReactElement => {
  const handleClick = () => {
    setActiveModal(id);
  };

  return (
    <Button
      className={cx(className, 'whitespace-nowrap capitalize')}
      size="small"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ContactButton;
