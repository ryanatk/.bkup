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
  cssRequired?: string;
  onFormSubmitted?: () => void;
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
  text = 'contact us',
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
      cssRequired: `
        #${modalId} .form-columns-2 {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        #${modalId} .form-columns-2 .hs-form-field {
          flex-shrink: 0;
          flex-grow: 1;
          min-width: 16rem;
        }
        
        #${modalId} .input {
          display: flex;
          border: 1px solid currentColor;
        }

        #${modalId} .hs-fieldtype-select .input:not(.select--multiple)::after {
          content: "";
          display: inline-block;
          width: 0.8rem;
          height: 0.5rem;
          background-color: currentColor;
          clip-path: polygon(100% 0%,0 0%,50% 100%);
        }
      `,
      onFormSubmitted: () => {
        sendSegmentTrack({
          type: EventType.B2bModalCompleted,
          payload: {
            action: 'submit form',
            cta: 'submit',
            location: 'B2B lead capture modal',
            path: asPath,
          },
        });
      },
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
        cta: text,
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
