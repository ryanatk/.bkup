export interface SectionProps {
  // name: MessageKey;
  name: string; // TODO: update
  id: string;
  handle?: string;
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
    id: 'section-research',
    handle: 'Research',
  },
  HEALTHCARE: {
    name: 'Healthcare',
    id: 'section-healthcare',
  },
  INTEGRATION: {
    name: 'Integration',
    id: 'section-integration',
  },
};

export default SECTION;
