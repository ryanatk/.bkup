import cx from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';
import { ContactForm } from '../data/contact-form';

interface Props {
  contactForm: ContactForm;
  text?: string;
  className?: string;
}

const ContactButton = ({
  contactForm,
  text = 'contact us',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal, isHubSpotLoaded } = useModalContext();

  const handleClick = () => {
    setActiveModal(contactForm.modalId);

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
  };

  return (
    <Button
      className={cx(className, 'whitespace-nowrap capitalize', {
        invisible: !isHubSpotLoaded,
      })}
      size="small"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ContactButton;
