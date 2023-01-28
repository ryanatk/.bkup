import { ComponentPropsWithoutRef } from 'react';
import { MessageKey } from '../public/locales/setup';

export type Footnote = {
  marker: string;
  content: MessageKey;
  linkProps?: ComponentPropsWithoutRef<'a'>;
};

export const AFFIRM_FOOTNOTE: Footnote = {
  marker: '†',
  content: 'footnote_affirm',
};

export const BASED_ON_SURVEY_FOOTNOTE: Footnote = {
  marker: '1',
  content: 'simple_home_footnote_1',
};

export const NEW_MEMBER_AUG_2022_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'new_member_aug_2022_footnote',
};

export const HORIZON_PDP_MEMBERSHIP_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'pdp_horizon_footnote_6_months_membership',
};

export const HOW_ACCURATE_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'footnote_oura_accuracy',
  linkProps: {
    href: '//ouraring.com/blog/how-accurate-is-oura/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const MEMBERSHIP_PRICING_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'footnotes_membership_pricing',
};

export const MOTHERS_DAY_FOOTNOTE: Footnote = {
  marker: '**',
  content: 'footnote_mothers_day',
};

export const MY_ACCOUNT_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'my_account_footnote',
};

export const PERSONAL_BASELINE_FOOTNOTE: Footnote = {
  marker: '**',
  content: 'footnote_personal_baseline',
};

export const SLEEP_ALGORITHM_FOOTNOTE: Footnote = {
  marker: '1',
  content: 'footnote_sleep_algorithm',
};

export const SPO2_FOOTNOTE: Footnote = {
  marker: '1',
  content: 'footnote_spo2',
};

export const VALIDATION_PSG_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'experience_footnote_1',
  linkProps: {
    href: '//ouraring.com/blog/oura-validation-psg/',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const WARRANTY_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'footnote_warranty',
  linkProps: {
    href: '//ouraring.com/terms-and-conditions',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};
export const BATTERY_FOOTNOTE: Footnote = {
  marker: '*',
  content: 'footnote_battery',
};
