export interface ContactForm {
  formId: string;
  region: string;
  portalId: string;
  tracking: {
    module: string;
    title: string;
  };
}

const DEFAULTS = {
  region: 'na1',
  portalId: '7217787',
};

const CONTACT_FORM: Record<string, ContactForm> = {
  WELLNESS: {
    ...DEFAULTS,
    formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
  PERFORMANCE: {
    ...DEFAULTS,
    formId: 'f2cb4281-f31d-46b9-8dc6-ed8bf75a9904',
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
  RESEARCH: {
    ...DEFAULTS,
    formId: 'c72b999c-beb2-48a2-bd72-cb9486c45081',
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
  HEALTHCARE: {
    ...DEFAULTS,
    formId: 'caa7e973-8d97-40c6-b19b-d1f708f64c18',
    tracking: {
      module: 'employee_wellness',
      title: 'Employee Wellness lead complete',
    },
  },
};

export default CONTACT_FORM;
