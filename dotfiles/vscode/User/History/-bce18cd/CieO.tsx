import { ReactElement } from 'react';
import Modal from '../../../sormus/Modal';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ id, isOpen, onClose }: Props): ReactElement => {
  return (
    <Modal open={isOpen} onClose={onClose} maxWidth="md">
      <div id={id} />
    </Modal>
  );
};

export default ContactModal;
