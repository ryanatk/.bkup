import cx from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';
import { Button } from '../../../sormus';
import { ContactForm } from '../data/contact-form';
<<<<<<< HEAD
import useContactModal from '../hooks/useContactModal';
import ContactModal from './ContactModal';
=======
import ContactModal from './ContactModal';

interface Config extends ContactForm {
  target: string;
}

declare global {
  interface Window {
    hbspt: { forms: { create: (config: Config) => void } };
  }
}
>>>>>>> origin/staging

interface Props {
  text?: string;
  className?: string;
  contactForm: ContactForm;
}

const ContactButton = ({
  text = 'contact us',
  contactForm,
  className,
}: Props): ReactElement => {
  const modalId = `business-contact-modal-${contactForm?.formId}`;
  const { createForm, onOpen } = useContactModal(modalId, contactForm, text);

  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    addScript(hubSpot, { onload: () => setIsHubSpotLoaded(true) });
    // don't clean up, so we only load scripts once
  }, [setIsHubSpotLoaded]);

  const handleClick = () => {
    onOpen();
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        className={cx(className, 'whitespace-nowrap capitalize', {
          hidden: !isHubSpotLoaded,
        })}
        size="small"
        onClick={handleClick}
      >
        {text}
      </Button>

      <ContactModal
        id={modalId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          createForm(); // reset the modal to show a new form on re-open (and not the "thank you" message or an incomplete form)
        }}
      />
    </>
  );
};

export default ContactButton;
