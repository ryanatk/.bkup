/* className for oura form, passed into HubSpot & used in CSS */
export const OURA_FORM = 'oura-form';

const styles = `


.${FORM}  {
  @apply mx-auto max-w-full w-max;
}

.${FORM} p {
  @apply text-caption;
}

fieldset {
  border: none;
  @apply w-full;
  margin-bottom: 1.25rem !important; // override hubspot style

  // give some margin to grouped div's
  & > div > div + div {
    @apply mt-5;
  }
}

legend {
  @apply text-body2 mb-0.5;
}

input[type='email'],
input[type='number'],
input[type='tel'],
input[type='text'],
textarea {
  @apply p-2 w-full;
  @apply border border-current;
}

input[type='checkbox'] {
  @apply mr-3 ml-1 my-2;
  @apply border border-current;
}

input[type='submit'] {
  @apply text-center inline-block transition;
  @apply border border-solid border-transparent rounded-full;
  @apply py-3 px-6 lg:py-2 lg:px-4 mt-4;
  @apply bg-helsinkiBlue text-white font-normal;
  @apply cursor-pointer;
}

select {
  @apply p-2 w-full;
  @apply bg-transparent appearance-none;
  @apply cursor-pointer;
}

// error messages
ul[role='alert'] {
  @apply text-red-600 text-body2;
}

a {
  @apply underline font-bold;
}

p:not(:last-of-type) {
  @apply mb-3;
}

p > span,
p > span > a {
  color: inherit !important;
}

`;

export default styles;
