import { MessageKey } from '../../../../public/locales/setup';
import CONTACT_FORM from './contact-form';

interface Props {
  value: MessageKey;
  label: MessageKey;
}

const CONNECT_OPTIONS: Props[] = [
  {
    value: CONTACT_FORM.WELLNESS.modalId,
    label: '',
  },
];
