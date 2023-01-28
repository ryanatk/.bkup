export interface ContactForm {
  formId: string;
  region: 'na1';
  portalId: '7217787';
}
region: 'na1';
portalId: '7217787';

export const CONTACT_FORM: Record<string, ContactForm> = {
  //   HERO: {
  //     formId: '',
  //   },
  WELLNESS: {
    formId: '981c71b5-21fb-407a-b7dc-ba71ac551561',
  },
  PERFORMANCE: {
    formId: 'f2cb4281-f31d-46b9-8dc6-ed8bf75a9904',
  },
  RESEARCH: {
    formId: 'c72b999c-beb2-48a2-bd72-cb9486c45081',
  },
  HEALTHCARE: {
    formId: 'caa7e973-8d97-40c6-b19b-d1f708f64c18',
  },
};

export default CONTACT_FORM;
