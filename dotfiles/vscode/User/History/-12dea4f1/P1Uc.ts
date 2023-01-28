import { MessageKey } from '../../../../public/locales/setup';

export interface SectionProps {
  name: MessageKey;
  id: string;
  handle?: string;
}

// TODO: update to use keys

const SECTION: Record<string, SectionProps> = {
  WELLNESS: {
    name: 'business_section_name_wellness',
    id: 'section-employee-wellness',
  },
  PERFORMANCE: {
    name: 'business_section_name_performance',
    id: 'section-performance',
  },
  RESEARCH: {
    name: 'business_section_name_research',
    id: 'section-research',
    handle: 'Research',
  },
  HEALTHCARE: {
    name: 'business_section_name_healthcare',
    id: 'section-healthcare',
  },
  INTEGRATION: {
    name: 'business_section_name_integration',
    id: 'section-integration',
  },
};

export default SECTION;
