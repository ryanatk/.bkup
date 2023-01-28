import { MessageKey } from '../../../../public/locales/setup';
import CONTACT_FORM, { ContactForm } from './contact-form';

interface Props {
  value: ContactForm.modalId;
  label: MessageKey;
}

const CONNECT_OPTIONS: Props[] = [
  {
    value: CONTACT_FORM.WELLNESS.modalId,
    label: '',
  },
];
