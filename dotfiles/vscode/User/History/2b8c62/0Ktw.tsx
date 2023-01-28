import cx from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { hubSpot } from '../../../../consts/scripts';
import addScript from '../../../../utils/addScript';
import { Button } from '../../../sormus';
import { ContactForm } from '../data/contact-form';
import ContactModal from './ContactModal';

interface Config extends ContactForm {
  target: string;
}

declare global {
  interface Window {
    hbspt: { forms: { create: (config: Config) => void } };
  }
}

interface Props {
  text?: string;
  className?: string;
  contactForm: ContactForm;
}

const ContactButton = ({
  text = 'Contact Us',
  contactForm,
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();
  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalId = `business-contact-modal-${contactForm?.formId}`;

  const createForm = () => {
    window.hbspt.forms.create({
      ...contactForm,
      target: '#' + modalId,
    });
  };

  useEffect(() => {
    addScript(hubSpot, { onload: () => setIsHubSpotLoaded(true) });
    // don't clean up, so we only load scripts once
  }, [setIsHubSpotLoaded]);

  const handleClick = () => {
    sendSegmentTrack({
      type: EventType.B2bModalOpened,
      payload: {
        cta: 'contact us',
        location: 'body',
        module: contactForm.tracking.module,
        path: asPath,
        title: contactForm.tracking.title,
      },
    });

    if (isFirstOpen) {
      createForm(); // wait until user opens the modal to init the form
      setIsFirstOpen(false);
    }
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
          createForm(); // reset the modal to show a new form on re-open (and not the "thank you" message)
        }}
      />
    </>
  );
};

export default ContactButton;
