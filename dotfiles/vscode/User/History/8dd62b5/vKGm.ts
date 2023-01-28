export interface ContactForm {
  modalId: string;
  htmlForm: {
    formId: string;
    region: string;
    portalId: string;
  };
  iframeForm: {
    formId: string;
    region: string;
    portalId: string;
  };
  tracking: {
    module: string;
    title: string;
  };
}

export const IFRAME_FORM = 'iframeForm';

const DEFAULTS = {
  region: 'na1',
  portalId: '7217787',
};

const CONTACT_FORM: Record<string, ContactForm> = {
  WELLNESS: {
    modalId: 'business-modal-contact-us-wellness',
    htmlForm: {
      ...DEFAULTS,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    [IFRAME_FORM]: {
      ...DEFAULTS,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
  PERFORMANCE: {
    modalId: 'business-modal-contact-us-performance',
    htmlForm: {
      ...DEFAULTS,
      formId: 'f2cb4281-f31d-46b9-8dc6-ed8bf75a9904',
    },
    iframeForm: {
      ...DEFAULTS,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    tracking: {
      module: 'performance',
      title: 'Performance lead complete',
    },
  },
  RESEARCH: {
    modalId: 'business-modal-contact-us-research',
    htmlForm: {
      ...DEFAULTS,
      formId: 'c72b999c-beb2-48a2-bd72-cb9486c45081',
    },
    iframeForm: {
      ...DEFAULTS,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    tracking: {
      module: 'research',
      title: 'Research lead complete',
    },
  },
  HEALTHCARE: {
    modalId: 'business-modal-contact-us-healthcare',
    htmlForm: {
      ...DEFAULTS,
      formId: 'caa7e973-8d97-40c6-b19b-d1f708f64c18',
    },
    iframeForm: {
      ...DEFAULTS,
      formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    },
    tracking: {
      module: 'healthcare',
      title: 'Healthcare lead complete',
    },
  },
};

export default CONTACT_FORM;
