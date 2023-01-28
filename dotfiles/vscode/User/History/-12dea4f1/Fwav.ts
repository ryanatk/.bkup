import { MessageKey } from '../../../../public/locales/setup';

export interface SectionProps {
  name: MessageKey;
  id: string;
}

const SECTIONS: SectionProps[] = [
  {
    name: 'Employee Wellness',
    id: 'employee-wellness',
  },
];

export default SECTIONS;
