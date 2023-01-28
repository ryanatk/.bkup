import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import IconNASA from '../../../svg/nasa_logo.svg';
import IconArmy from '../../../svg/us_army_logo.svg';
import IconNavy from '../../../svg/us_navy_logo.svg';
import IconWNBA from '../../../svg/wnba_logo.svg';
import { src } from '../../../utils/imageHelpers';
import { List } from '../../sormus';
import { Feature, Typ } from './components';
import { QUOTES, SECTION } from './data';

const BusinessFeatures = (): ReactElement => {
  const { formatMessage } = useIntl();

  return (
    <div className="md:pt-24">
      <Feature
        {...SECTION.WELLNESS}
        reverse
        title="Awaken your workforce's potential."
        body="Empower your employees to optimize their daily habits and prioritize health with personalized analytics. Oura’s Employee Wellness solutions include compelling group-level insights that help connect individual outcomes with real world business impacts like productivity, absenteeism, and employee morale. As an appreciation gift, or as a component of your benefits program, the Oura Ring makes wellness a collective priority."
        image={{
          src: src('business/feature-01@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_1_alt' }),
        }}
        quote={{ ...QUOTES[1] }}
      />

      <Feature
        hideContactButton
        title="A holistic approach to employee wellness."
        body="Our Employee Wellness Program is a holistic solution, designed to drive best-in-class adoption, engagement, and outcomes."
        content={
          <List type="ul" color="inherit">
            <li>Award-winning Oura Ring + App</li>
            <li>Oura Wellness Report</li>
            <li>Compelling Content</li>
            <li>Insights & Engagement</li>
            <li>Empowering Events</li>
          </List>
        }
        image={{
          src: src('business/feature-02@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_2_alt' }),
        }}
      />

      <Feature
        {...SECTION.PERFORMANCE}
        reverse
        title="Ready for anything."
        body="Whether you're managing a professional sports organization or training elite forces, ensure your team is always performing at the highest level with precise biometrics. Use accurate, continuous data to prioritize rest, adjust training schedules, monitor recovery, and detect signs of illness, injury, and fatigue."
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
            Trusted by
          </Typ>

          <ul className="flex gap-2 lg:gap-8 items-center justify-between">
            <li>
              <IconNavy alt="US Navy Logo" />
            </li>
            <li>
              <IconWNBA alt="WNBA Logo" />
            </li>
            <li>
              <IconArmy alt="US Army Logo" />
            </li>
            <li>
              <IconNASA alt="NASA Logo" />
            </li>
          </ul>
        </Typ>
      </Feature>

      <Feature
        {...SECTION.RESEARCH}
        title="Bring research full circle."
        body="Streamline, collect, access, and analyze data securely with the advanced sensors of the Oura Ring and Oura’s research solutions. Oura's unique, discreet form factor encourages continuous ring wear, resulting in comprehensive, rich data, high protocol adherence, and decentralized data collection."
        fullImage
        image={{
          src: src('business/feature-04@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_4_alt' }),
        }}
      />

      <Feature
        {...SECTION.HEALTHCARE}
        reverse
        title="Care proactively with informed insights."
        body="Turn reactive healthcare into proactive wellness using robust data to help detect trends associated with potential health risks."
        fullImage
        image={{
          src: src('business/feature-05@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_5_alt' }),
        }}
      />

      <Feature
        {...SECTION.INTEGRATION}
        title="A seamless integration."
        body="Enhance your data, insights, user experience, and outcomes by seamlessly incorporating Oura's biometric data with your existing platform to allow users to share their daily scores."
        fullImage
        image={{
          src: src('business/feature-06@2x', 'jpg', 600),
          alt: formatMessage({ id: 'business_feature_6_alt' }),
        }}
      />
    </div>
  );
};

export default BusinessFeatures;
