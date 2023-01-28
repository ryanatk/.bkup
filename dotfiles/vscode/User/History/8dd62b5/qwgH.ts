interface HubSpotConfig {
  formId: string;
  region: string;
  portalId: string;
}
export interface ContactForm {
  modalId: string;
  htmlForm: HubSpotConfig;
  iframeForm: HubSpotConfig;
  tracking: {
    module: string;
    title: string;
  };
}

export const HTML_FORM = 'htmlForm';
export const IFRAME_FORM = 'iframeForm';

const DEFAULT_CONFIG = {
  region: 'na1',
  portalId: '7217787',
};

const CONTACT_FORM: Record<string, ContactForm> = {
  WELLNESS: {
    modalId: 'business-modal-contact-us-wellness',
    [HTML_FORM]: {
      ...DEFAULT_CONFIG,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    [IFRAME_FORM]: {
      ...DEFAULT_CONFIG,
      formId: 'dce1b8ed-0435-41aa-9afc-5bfa8a5af60a',
    },
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
  PERFORMANCE: {
    modalId: 'business-modal-contact-us-performance',
    [HTML_FORM]: {
      ...DEFAULT_CONFIG,
      formId: 'f2cb4281-f31d-46b9-8dc6-ed8bf75a9904',
    },
    [IFRAME_FORM]: {
      ...DEFAULT_CONFIG,
      formId: '118ef6a1-4645-4ed1-9e5f-40d35086c780',
    },
    tracking: {
      module: 'performance',
      title: 'Performance lead complete',
    },
  },
  RESEARCH: {
    modalId: 'business-modal-contact-us-research',
    [HTML_FORM]: {
      ...DEFAULT_CONFIG,
      formId: 'c72b999c-beb2-48a2-bd72-cb9486c45081',
    },
    [IFRAME_FORM]: {
      ...DEFAULT_CONFIG,
      formId: '57685746-2d57-4c35-b13a-9619db3e0a77',
    },
    tracking: {
      module: 'research',
      title: 'Research lead complete',
    },
  },
  HEALTHCARE: {
    modalId: 'business-modal-contact-us-healthcare',
    [HTML_FORM]: {
      ...DEFAULT_CONFIG,
      formId: 'caa7e973-8d97-40c6-b19b-d1f708f64c18',
    },
    [IFRAME_FORM]: {
      ...DEFAULT_CONFIG,
      formId: '1c640919-9079-4b09-b72b-fb32db826fd6',
    },
    tracking: {
      module: 'healthcare',
      title: 'Healthcare lead complete',
    },
  },
};

export default CONTACT_FORM;
