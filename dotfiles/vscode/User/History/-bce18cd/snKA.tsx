import { ReactElement, useEffect } from 'react';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';
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
  setIsReady,
}: Props): ReactElement => {
  useEffect(() => {
    addScript({
      ...hubSpot,
      onload: () => {
        createForm(id, contactForm);
        setIsReady(true);
      },
    });
    // don't clean up, so we only load scripts once
  }, [setIsReady, createForm, id]);

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
