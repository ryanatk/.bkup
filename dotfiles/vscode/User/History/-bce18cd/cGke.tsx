import { ReactElement, useCallback, useEffect } from 'react';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';
import Modal from '../../../sormus/Modal';
import { ContactForm } from '../data/contact-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contactForm: ContactForm;
  setIsReady: (ready: boolean) => void;
}

const ContactModal = ({
  isOpen,
  onClose,
  contactForm,
  setIsReady,
}: Props): ReactElement => {
  const modalId = `business-contact-modal-${contactForm?.formId}`;
  const createForm = useCallback(
    () =>
      window.hbspt.forms.create({
        target: '#' + modalId,
        ...contactForm,
      }),
    [contactForm, modalId],
  );

  useEffect(() => {
    addScript({
      ...hubSpot,
      onload: () => {
        createForm();
        setIsReady(true);
      },
    });
    // don't clean up, so we only load scripts once
  }, [setIsReady, createForm, modalId]);

  const handleClose = () => {
    onClose();
    createForm();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} maxWidth="md">
      <div id={modalId} />
    </Modal>
  );
};

export default ContactModal;
