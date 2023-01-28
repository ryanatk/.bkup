import cx from 'classnames';
import { ReactElement } from 'react';
import { Button } from '../../../sormus';

interface Props {
  id: string;
  text?: string;
  className?: string;
  // contactForm: ContactForm;
  setActiveModal: (id: string) => void;
}

const ContactButton = ({
  id,
  text = 'contact us',
  // contactForm,
  className,
  setActiveModal,
}: Props): ReactElement => {
  // const modalId = `business-contact-modal-${contactForm?.formId}`;
  // const { createForm, onOpen } = useContactModal(modalId, contactForm, text);

  // const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   addScript(hubSpot, { onload: () => setIsHubSpotLoaded(true) });
  //   // don't clean up, so we only load scripts once
  // }, [setIsHubSpotLoaded]);

  const handleClick = () => {
    // onOpen();
    setActiveModal(id);
  };

  return (
    <>
      <Button
        className={cx(className, 'whitespace-nowrap capitalize', {
          // hidden: !isHubSpotLoaded,
        })}
        size="small"
        onClick={handleClick}
      >
        {text}
      </Button>

      {/* <ContactModal
        id={modalId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          createForm(); // reset the modal to show a new form on re-open (and not the "thank you" message or an incomplete form)
        }}
      /> */}
    </>
  );
};

export default ContactButton;
