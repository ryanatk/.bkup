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
  PERFORMANCE: {
    name: 'Performance',
    id: 'section-performance',
  },
  RESEARCH: {
    name: 'Clinical & Educational Research',
    id: 'section-performance',
    handle: 'Research',
  },
};

export default SECTION;
