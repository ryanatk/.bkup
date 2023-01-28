import { MessageKey } from '../../../../public/locales/setup';

export interface SectionProps {
  name: MessageKey;
  id: string;
}

const FEATURE: Record<string, SectionProps> = {
  WELLNESS: {
    name: 'Employee Wellness',
    id: 'employee-wellness',
  },
};

export default FEATURE;