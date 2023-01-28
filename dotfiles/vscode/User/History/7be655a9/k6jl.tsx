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
import { useModalContext } from '../context/ModalContext';
import { CONNECT_MODAL_ID, CONTACT_FORM, SECTION } from '../data';
import useContactModal from '../hooks/useContactModal';
import Typ from './Typ';

const ConnectModal = (): ReactElement => {
  const { formatMessage } = useIntl();
  const { activeModal, setActiveModal } = useModalContext();
  const { isHubSpotLoaded } = useContactModal();
  const [selectedModalId, setSelectedModalId] = useState(null);

  const isOpen = activeModal === CONNECT_MODAL_ID;

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleChange = ({ target }) => {
    setSelectedModalId(target.value);
  };

  const handleSubmit = () => {
    setActiveModal(selectedModalId);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <TypographyRhythm>
        <Typ Element="h3" variant="h6" weight="normal">
          {t('business_connect_modal_heading')}
        </Typ>

        <Typ Element="ul">
          <RadioGroup
            name="business-modal-form-connect"
            label={formatMessage({ id: 'business_connect_modal_heading' })}
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
