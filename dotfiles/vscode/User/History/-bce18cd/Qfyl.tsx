import { ReactElement, useCallback, useEffect } from 'react';
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

const ContactModal = ({
  id,
  isOpen,
  onClose,
  contactForm,
  setIsReady,
}: Props): ReactElement => {
  const createForm = useCallback(
    () =>
      window.hbspt.forms.create({
        target: '#' + id,
        ...contactForm,
      }),
    [contactForm, id],
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
  }, [setIsReady, createForm, id]);

  const handleClose = () => {
    onClose();
    createForm();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} maxWidth="md">
      <div id={id} />
    </Modal>
  );
};

export default ContactModal;
