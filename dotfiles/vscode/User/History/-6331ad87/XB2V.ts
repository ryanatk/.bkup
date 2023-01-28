import { MessageKey } from '../../../../public/locales/setup';
import { LEARN_MORE_ID } from '../const';
import CONTACT_FORM from './contact-form';

interface Props {
  value: string;
  label: MessageKey;
}

const CONNECT_OPTIONS: Props[] = [
  {
    value: CONTACT_FORM.WELLNESS.modalId,
    label: 'business_connect_option_1',
  },
  {
    value: CONTACT_FORM.WELLNESS.modalId,
    label: 'business_connect_option_2',
  },
  {
    value: CONTACT_FORM.PERFORMANCE.modalId,
    label: 'business_connect_option_3',
  },
  {
    value: CONTACT_FORM.PERFORMANCE.modalId,
    label: 'business_connect_option_4',
  },
  {
    value: CONTACT_FORM.RESEARCH.modalId,
    label: 'business_connect_option_5',
  },
  {
    value: CONTACT_FORM.HEALTHCARE.modalId,
    label: 'business_connect_option_6',
  },
  {
    value: LEARN_MORE_ID,
    label: 'business_connect_option_7',
  },
];

export default CONNECT_OPTIONS;
