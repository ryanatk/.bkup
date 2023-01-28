const getHubSpotHtmlStyles = (id: string): string =>
  [
    /* 2-column layout wrapper */
    ` #${id} .form-columns-2 {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    `,
    /* 2-column layout field */
    ` #${id} .form-columns-2 .hs-form-field {
        flex: 1 0 16rem;
      }
    `,
    /* apply select's border to parent div, so we can style the arrow */
    ` #${id} .hs-fieldtype-select .input {
        display: flex;
        align-items: center;
        border: 1px solid currentColor;
      }
    `,
    /* custom select arrow */
    ` #${id} .hs-fieldtype-select .input:not(.select--multiple)::after {
        content: "";
        display: inline-block;
        margin: 0 0.5rem;
        width: 0.8rem;
        height: 0.5rem;
        background-color: currentColor;
        clip-path: polygon(100% 0%,0 0%,50% 100%);
      }
    `,
    /* error message above "submit" button */
    ` #${id} .hs_error_rollup {
        color: rgba(220, 38, 38);
      }
    `,

    `
      .modal {
        // styles for the modal contents, which come from HubSpot

        form {
          @apply mx-auto max-w-full w-max;

          p {
            @apply text-caption;
          }
        }

        fieldset {
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
          // there are inline styles (from hubspot) making this text white
          color: inherit !important;
        }
      }`,
  ].join('');

export default getHubSpotHtmlStyles;
