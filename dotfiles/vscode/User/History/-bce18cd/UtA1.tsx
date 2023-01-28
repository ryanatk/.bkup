import { Skeleton } from '@material-ui/lab';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import Modal from '../../../sormus/Modal';
import { ContactForm } from '../data/contact-form';
// import './ContactModal.scss';

interface Props {
  // id: string;
  contactForm: ContactForm;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({
  // id,
  contactForm,
  isOpen,
  onClose,
}: Props): ReactElement => {
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const modalId = `business-contact-modal-${contactForm?.formId}`;

  const createForm = useCallback(() => {
    window.hbspt.forms.create({
      ...contactForm,
      target: '#' + modalId,
    });
  }, [contactForm]);

  useEffect(() => {
    if (isFirstOpen) {
      createForm(); // wait until user opens the modal to init the form
      setIsFirstOpen(false);
    }
  }, [isOpen, createForm]);

  return (
    <Modal open={isOpen} onClose={onClose} maxWidth="md">
      <div id={modalId} className="business-contact-modal-form">
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
      </div>
    </Modal>
  );
};

export default ContactModal;
