import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { hubSpot } from '../../../../consts/scripts';
import { useFeatureFlag } from '../../../../queries/FeaturesConfig';
import addScript from '../../../../utils/addScript';
import { ContactForm, HTML_FORM, IFRAME_FORM } from '../data/contact-form';

interface Config {
  target: string;
  cssRequired?: string;
  onFormSubmitted?: () => void;
}

declare global {
  interface Window {
    hbspt: { forms: { create: (config: Config) => void } };
  }
}

const useHubSpotForms = (
  contactForm?: ContactForm,
): {
  createForm: () => void;
  isHubSpotLoaded: boolean;
} => {
  const { asPath } = useRouter();
  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false);

  const { enabled: isIframeEnabled, isLoading: isFlagsLoading } =
    useFeatureFlag('b2b-hubspot-iframe');
  const formConfig = isIframeEnabled ? IFRAME_FORM : HTML_FORM;

  useEffect(() => {
    const cleanUp = addScript(hubSpot, {
      onload: () => setIsHubSpotLoaded(true),
    });

    // clean up, so hubspot is not present on other pages
    return () => {
      console.log('hubspot cleanup'); // TODO: test & remove
      // cleanUp();
      // window.hbspt = null;
    };
  }, [setIsHubSpotLoaded]);

  const createForm = () => {
    if (!contactForm) {
      throw new Error('contactForm object is required when using createForm');
    }

    const id = contactForm.modalId;

    window.hbspt.forms.create({
      ...contactForm[formConfig],
      target: '#' + id,

      /**
       * Adding styles here that require className selectors, for specificity.
       * (We can't use these classNames in a CSS Module, because they're renamed)
       * Using this property also removes all default styling from HubSpot (a good thing).
       * https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
       */
      cssRequired: [
        // ` fieldset {
        //     border: none;
        //   }
        // `,
        /* 2-column layout wrapper */
        // ` .form-columns-2 {
        //     width: 100%;
        //     display: flex;
        //     flex-wrap: wrap;
        //     gap: 1rem;
        //   }
        // `,
        /* 2-column layout field */
        // ` .form-columns-2 .hs-form-field {
        //     flex: 1 0 16rem;
        //   }
        // `,
        /* apply select's border to parent div, so we can style the arrow */
        // ` .hs-fieldtype-select .input {
        //     display: flex;
        //     align-items: center;
        //     border: 1px solid currentColor;
        //   }
        // `,
        /* custom select arrow */
        // ` .hs-fieldtype-select .input:not(.select--multiple)::after {
        //     content: "";
        //     display: inline-block;
        //     margin: 0 0.5rem;
        //     width: 0.8rem;
        //     height: 0.5rem;
        //     background-color: currentColor;
        //     clip-path: polygon(100% 0%,0 0%,50% 100%);
        //   }
        // `,
        /* error message above "submit" button */
        // ` .hs_error_rollup {
        //     color: rgba(220, 38, 38);
        //   }
        // `,
      ].join(''),

      onFormSubmitted: () => {
        sendSegmentTrack({
          type: EventType.B2bModalCompleted,
          payload: {
            action: 'submit form',
            cta: 'submit',
            location: 'B2B lead capture modal',
            path: asPath,
          },
        });
      },
    });
  };

  return {
    createForm,
    isHubSpotLoaded: isHubSpotLoaded && !isFlagsLoading,
  };
};

export default useHubSpotForms;
