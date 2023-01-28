import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { t } from '../../../public/locales/LocaleContext';
import IconNASA from '../../../svg/nasa_logo.svg';
import IconArmy from '../../../svg/us_army_logo.svg';
import IconNavy from '../../../svg/us_navy_logo.svg';
import IconWNBA from '../../../svg/wnba_logo.svg';
import { src } from '../../../utils/imageHelpers';
import { Button, List } from '../../sormus';
import { Feature, Typ } from './components';
import { CONTACT_FORM, QUOTES, SECTION } from './data';

const BusinessFeatures = (): ReactElement => {
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
        // contactForm={CONTACT_FORM.PERFORMANCE}
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
            <li>
              <IconNavy
                alt={formatMessage({ id: 'business_feature_logo_us_navy_alt' })}
              />
            </li>
            <li>
              <IconWNBA
                alt={formatMessage({ id: 'business_feature_logo_wnba_alt' })}
              />
            </li>
            <li>
              <IconArmy
                alt={formatMessage({ id: 'business_feature_logo_us_army_alt' })}
              />
            </li>
            <li>
              <IconNASA
                alt={formatMessage({ id: 'business_feature_logo_nasa_alt' })}
              />
            </li>
          </ul>
        </Typ>
      </Feature>

      <Feature
        {...SECTION.RESEARCH}
        // contactForm={CONTACT_FORM.RESEARCH}
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
        // contactForm={CONTACT_FORM.HEALTHCARE}
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
        <Button>Learn More</Button>
      </Feature>
    </div>
  );
};

export default BusinessFeatures;
