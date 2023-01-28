import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Button, List } from '../../sormus';
import { Feature, Typ } from './components';
import { CONTACT_FORM, LOGO, QUOTES, SECTION } from './data';

const LOGOS = [LOGO.NAVY, LOGO.WNBA, LOGO.ARMY, LOGO.NASA];

const BusinessFeatures = (): ReactElement => {
  const { asPath } = useRouter();
  const { formatMessage } = useIntl();

  return (
    <div className="md:pt-24">
      <Feature
        {...SECTION.WELLNESS}
        contactForm={CONTACT_FORM.WELLNESS}
        reverse
        title="business_feature_1_title"
        body="business_feature_1_body"
        image={{
          src: src('business/feature-01@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_1_alt' }),
        }}
        quote={{ ...QUOTES[1] }}
      />

      <Feature
        title="business_feature_2_title"
        body="business_feature_2_body"
        content={
          <List type="ul" color="inherit">
            <li>{t('business_feature_2_item_1')}</li>
            <li>{t('business_feature_2_item_2')}</li>
            <li>{t('business_feature_2_item_3')}</li>
            <li>{t('business_feature_2_item_4')}</li>
            <li>{t('business_feature_2_item_5')}</li>
          </List>
        }
        image={{
          src: src('business/feature-02@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_2_alt' }),
        }}
      />

      <Feature
        {...SECTION.PERFORMANCE}
        contactForm={CONTACT_FORM.PERFORMANCE}
        reverse
        title="business_feature_3_title"
        body="business_feature_3_body"
        fullImage
        image={{
          src: src('business/feature-03@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_3_alt' }),
        }}
      >
        <Typ
          Element="ul"
          color="grayscale-text"
          className="bg-sand-light p-6 lg:p-8 rounded-xl mt-10 lg:mt-20 w-full lg:w-auto"
        >
          <Typ Element="h4" className="mb-5 lg:mb-8 text-center lg:text-left">
            {t('business_feature_trusted_by')}
          </Typ>

          <ul className="flex gap-2 lg:gap-8 items-center justify-between">
            {LOGOS.map(({ Icon, alt, size }) => (
              <li key={alt} className="h-32 py-7 px-6 flex items-center">
                <Icon
                  alt={formatMessage({ id: alt })}
                  className="mx-auto"
                  {...size.trustedBy}
                />
              </li>
            ))}
          </ul>
        </Typ>
      </Feature>

      <Feature
        {...SECTION.RESEARCH}
        contactForm={CONTACT_FORM.RESEARCH}
        title="business_feature_4_title"
        body="business_feature_4_body"
        fullImage
        image={{
          src: src('business/feature-04@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_4_alt' }),
        }}
      />

      <Feature
        {...SECTION.HEALTHCARE}
        contactForm={CONTACT_FORM.HEALTHCARE}
        reverse
        title="business_feature_5_title"
        body="business_feature_5_body"
        fullImage
        image={{
          src: src('business/feature-05@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_5_alt' }),
        }}
      />

      <Feature
        {...SECTION.INTEGRATION}
        title="business_feature_6_title"
        body="business_feature_6_body"
        fullImage
        image={{
          src: src('business/feature-06@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_6_alt' }),
        }}
      >
        <Button
          link
          href="https://cloud.ouraring.com/v2/docs"
          target="_blank"
          className="mt-4"
          onClick={() => {
            sendSegmentTrack({
              type: EventType.CTAClicked,
              payload: {
                action: 'go to integration documentation',
                cta: 'learn more',
                location: 'body',
                module: 'integration',
                path: asPath,
              },
            });
          }}
        >
          Learn More
        </Button>
      </Feature>
    </div>
  );
};

export default BusinessFeatures;
