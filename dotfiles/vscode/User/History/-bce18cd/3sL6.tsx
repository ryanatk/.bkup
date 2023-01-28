import { ReactElement } from 'react';
import Modal from '../../../sormus/Modal';
import { ContactForm } from '../data/contact-form';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  contactForm: ContactForm;
  setIsReady: (ready: boolean) => void;
}

export const createForm = (id: string, contactForm: ContactForm): void => {
  window.hbspt.forms.create({
    target: '#' + id,
    ...contactForm,
  });
};

const ContactModal = ({
  id,
  isOpen,
  onClose,
  contactForm,
}: Props): ReactElement => {
  const handleClose = () => {
    onClose();
    createForm(id, contactForm);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} maxWidth="md">
      <div id={id} />
    </Modal>
  );
};

export default ContactModal;
