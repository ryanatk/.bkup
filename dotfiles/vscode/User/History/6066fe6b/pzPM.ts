import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { hubSpot } from '../../../../consts/scripts';
import { useFeatureFlag } from '../../../../queries/FeaturesConfig';
import addScript from '../../../../utils/addScript';
import { ContactForm, HTML_FORM, IFRAME_FORM } from '../data/contact-form';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require('!!raw-loader!./hubSpotForms.css').default;
// TODO: update with webpack 5
// raw-loader is deprecated, and replaced with asset/source rule
// https://webpack.js.org/guides/asset-modules/

interface Config {
  target: string;
  cssClass?: string;
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
    addScript(hubSpot, {
      onload: () => setIsHubSpotLoaded(true),
    });
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
      cssRequired: styles,

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
