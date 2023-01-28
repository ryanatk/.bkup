import cx from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { Button } from '../../../sormus';
import { useModalContext } from '../context/ModalContext';
import { ContactForm } from '../data/contact-form';

interface Props {
  contactForm: ContactForm;
  text?: MessageKey;
  className?: string;
}

const ContactButton = ({
  contactForm,
  text = 'business_button_contact_text',
  className,
}: Props): ReactElement => {
  const { asPath } = useRouter();
  const { setActiveModal, isHubSpotLoaded } = useModalContext();

  const handleClick = () => {
    setActiveModal(contactForm.modalId);

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
  };

  return (
    <Button
      className={cx(className, 'whitespace-nowrap capitalize', {
        invisible: !isHubSpotLoaded,
      })}
      size="small"
      onClick={handleClick}
      data-cy={`button-${contactForm.modalId}`}
    >
      {t(text)}
    </Button>
  );
};

export default ContactButton;
