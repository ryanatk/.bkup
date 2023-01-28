import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { List } from '../../sormus';
import { Feature, LearnMoreButton, Typ } from './components';
import { CONTACT_FORM, LOGO, QUOTES, SECTION } from './data';

const LOGOS = [LOGO.NAVY, LOGO.WNBA, LOGO.ARMY, LOGO.NASA];

const BusinessFeatures = (): ReactElement => {
  const { formatMessage } = useIntl();

  return (
    <div className="pb-10 md:pt-10">
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
              <li key={alt}>
                <Icon
                  {...size.trustedBy}
                  aria-hidden="true" // screen readers will use "alt" span below
                />
                <span className="sr-only">{t(alt)}</span>
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
        <LearnMoreButton location="body" module="integration" />
      </Feature>
    </div>
  );
};

export default BusinessFeatures;
