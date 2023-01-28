import { usePageState } from '../../../hooks/usePageState';
import { AccoladesMarquee, PageLayout } from '../../sormus';
import HealthJourneyBanner from '../_global/HealthJourneyBanner/HealthJourneyBanner';
import AppFeature from './AppFeature';
import Hero from './Hero';
import LearnMore from './LearnMore';
import Mission from './Mission';
import ProductFeature from './ProductFeature';
import Stories from './Stories';

const SimpleHome = (): JSX.Element => {
  const { headerHeight, headerRef, updateHeaderHeight } = usePageState({
    featureFlag: 'enable-simple',
  });
  return (
    <PageLayout
      className="bg-sand"
      headerProps={{
        bordered: false,
        onHeaderUpdate: updateHeaderHeight,
        ref: headerRef,
        inverse: true,
      }}
    >
      <Hero headerHeight={headerHeight} />
      <div className="relative z-10">
        <Mission />
        <AccoladesMarquee />
        <ProductFeature />
        <AppFeature />
        <Stories />
        <LearnMore />
        <HealthJourneyBanner />
      </div>
    </PageLayout>
  );
};

export default SimpleHome;
