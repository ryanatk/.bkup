import { MessageKey } from '../../../../public/locales/setup';
import { LEARN_MORE_ID } from '../const';
import CONTACT_FORM from './contact-form';

interface Props {
  modalId: string;
  value: string;
  label: MessageKey;
}

const CONNECT_OPTIONS: Props[] = [
  {
    modalId: CONTACT_FORM.WELLNESS.modalId,
    label: 'business_connect_option_1',
    value: 'business_connect_option_1',
  },
  {
    modalId: CONTACT_FORM.WELLNESS.modalId,
    label: 'business_connect_option_2',
    value: 'business_connect_option_2',
  },
  {
    modalId: CONTACT_FORM.PERFORMANCE.modalId,
    label: 'business_connect_option_3',
    value: 'business_connect_option_2',
  },
  {
    modalId: CONTACT_FORM.PERFORMANCE.modalId,
    label: 'business_connect_option_4',
    value: 'business_connect_option_2',
  },
  {
    modalId: CONTACT_FORM.RESEARCH.modalId,
    label: 'business_connect_option_5',
    value: 'business_connect_option_2',
  },
  {
    modalId: CONTACT_FORM.HEALTHCARE.modalId,
    label: 'business_connect_option_6',
    value: 'business_connect_option_2',
  },
  {
    modalId: LEARN_MORE_ID,
    label: 'business_connect_option_7',
    value: 'business_connect_option_2',
  },
];

export default CONNECT_OPTIONS;
