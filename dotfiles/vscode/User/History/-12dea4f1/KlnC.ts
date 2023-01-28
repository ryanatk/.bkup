import { MessageKey } from '../../../../public/locales/setup';

export interface SectionProps {
  name: MessageKey;
  id: string;
}

// TODO: update to use keys

const SECTION: Record<string, SectionProps> = {
  WELLNESS: {
    name: 'Employee Wellness',
    id: 'section-employee-wellness',
  },
};

export default SECTION;
