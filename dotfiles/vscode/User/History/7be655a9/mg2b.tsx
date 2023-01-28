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
import { CONNECT_MODAL_ID, LEARN_MORE_ID } from '../const';
import { useModalContext } from '../context/ModalContext';
import { CONNECT_OPTIONS } from '../data';
import LearnMoreButton from './LearnMoreButton';
import Typ from './Typ';

const ConnectModal = (): ReactElement => {
  const { formatMessage } = useIntl();
  const { activeModal, setActiveModal, isHubSpotLoaded } = useModalContext();
  const [selectedModalId, setSelectedModalId] = useState(null);

  const isOpen = activeModal === CONNECT_MODAL_ID;

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleChange = ({ target }) => {
    setSelectedModalId(target.value);
  };

  const handleSubmit = () => {
    setActiveModal(CONNECT_OPTIONS[selectedModalId].modalId);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} data-cy="connect-modal">
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
            {console.log({ selectedModalId })}
            {CONNECT_OPTIONS.map(({ label }, i) => (
              <li key={label}>
                <RadioButton
                  selected={selectedModalId === i}
                  value={i.toString()}
                  label={formatMessage({ id: label })}
                />
              </li>
            ))}
          </RadioGroup>
        </Typ>

        {selectedModalId === LEARN_MORE_ID ? (
          <LearnMoreButton
            label="next_button"
            module="connect"
            location="modal"
          />
        ) : (
          <Button
            onClick={handleSubmit}
            size="small"
            className="mt-8"
            disabled={!isHubSpotLoaded}
          >
            {t('next_button')}
          </Button>
        )}
      </TypographyRhythm>
    </Modal>
  );
};

export default ConnectModal;
