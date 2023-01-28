import { ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import { t } from '../../../../public/locales/LocaleContext';
import {
  Button,
  RadioButton,
  RadioGroup,
  TypographyRhythm,
} from '../../../sormus';
import Modal from '../../../sormus/Modal';
import { CONNECT_MODAL_ID } from '../const';
import { useModalContext } from '../context/ModalContext';
import { CONTACT_FORM, SECTION } from '../data';
import Typ from './Typ';

const ConnectModal = (): ReactElement => {
  const { formatMessage } = useIntl();
  const { activeModal, setActiveModal, isHubSpotLoaded } = useModalContext();
  const [selectedModalId, setSelectedModalId] = useState(null);

  const isOpen = activeModal === CONNECT_MODAL_ID;

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleChange = (e) => {
    setSelectedModalId(e.target.value);
  };

  const handleSubmit = () => {
    setActiveModal(selectedModalId);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <TypographyRhythm>
        <Typ Element="h3" variant="h6" weight="normal">
          Please select your area of interest:
        </Typ>

        <Typ Element="ul">
          <RadioGroup
            name=""
            label=""
            value={selectedModalId}
            onChange={handleChange}
          >
            {Object.entries(CONTACT_FORM).map(([name, contactForm]) => (
              <li key={contactForm.modalId}>
                <RadioButton
                  value={contactForm.modalId}
                  label={formatMessage({ id: SECTION[name].name })}
                />
              </li>
            ))}
          </RadioGroup>
        </Typ>

        <Button
          onClick={handleSubmit}
          size="small"
          className="mt-8"
          disabled={!isHubSpotLoaded}
        >
          {t('next_button')}
        </Button>
      </TypographyRhythm>
    </Modal>
  );
};

export default ConnectModal;
