import { Waypoint } from 'react-waypoint';
import MembershipAccolades from '../../components/pages/membership/MembershipAccolades';
import MembershipBenefits from '../../components/pages/membership/MembershipBenefits';
import MembershipFAQ from '../../components/pages/membership/MembershipFAQ';
import MembershipFeatures from '../../components/pages/membership/MembershipFeatures';
import MembershipHero from '../../components/pages/membership/MembershipHero';
import MembershipYourHealth from '../../components/pages/membership/MembershipYourHealth';
import { BetterSleepBanner } from '../../components/pages/_global';
import BilboLegalFootnotes from '../../components/pages/_global/BilboLegalFootnotes';
import {
  PageContainer,
  PageLayout,
  Redirect,
  ScrollTeaser,
} from '../../components/sormus';
import { usePageState } from '../../hooks/usePageState';

export const Membership = (): JSX.Element => {
  const { dynamicPageClasses, setDynamicPageClasses, headerRef, pageEnabled } =
    usePageState({ featureFlag: 'new-membership-page' });

  if (!pageEnabled) return <Redirect path="/" />;

  return (
    <PageLayout
      className={`transition-colors duration-200 ${dynamicPageClasses}`}
      headerProps={{
        bordered: true,
        ref: headerRef,
      }}
    >
      <PageContainer name="membership" padding="none">
        <Waypoint onEnter={() => setDynamicPageClasses('bg-sand-light')}>
          <div>
            <MembershipHero />
            <MembershipFeatures />
            <MembershipAccolades />
          </div>
        </Waypoint>
        <Waypoint
          scrollableAncestor={window}
          bottomOffset="20%"
          topOffset="60%"
          onEnter={() => setDynamicPageClasses('bg-white')}
        >
          <div>
            <MembershipYourHealth />
          </div>
        </Waypoint>
        <MembershipBenefits />
        <MembershipFAQ />
        <BetterSleepBanner />
        <BilboLegalFootnotes pageName="membership" />
        <ScrollTeaser />
      </PageContainer>
    </PageLayout>
  );
};

Membership.pageName = 'Membership';
Membership.isSormusCompatible = true;

export default Membership;
