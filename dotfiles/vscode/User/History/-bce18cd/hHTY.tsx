import { Skeleton } from '@material-ui/lab';
import { ReactElement, useEffect, useState } from 'react';
import Modal from '../../../sormus/Modal';
import { useModalContext } from '../context/ModalContext';
import { ContactForm } from '../data/contact-form';
import useContactModal from '../hooks/useHubSpotForms';
import styles from './ContactModal.module.scss';
import Typ from './Typ';

interface Props {
  contactForm: ContactForm;
}

const ContactModal = ({ contactForm }: Props): ReactElement => {
  const { activeModal, setActiveModal } = useModalContext();
  const { createForm } = useContactModal(contactForm);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const id = contactForm.modalId;
  const isOpen = activeModal === id;

  useEffect(() => {
    if (isOpen && isFirstOpen) {
      createForm(); // wait until user opens the modal to init the form
      setIsFirstOpen(false);
    }
  }, [createForm, isFirstOpen, isOpen]);

  const handleClose = () => {
    setActiveModal(null);
    createForm(); // recreate the form on close, so the user doesn't see the previous form/message when reopening
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Typ Element="div" id={id} className={styles.modal}>
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
      </Typ>
    </Modal>
  );
};

export default ContactModal;
