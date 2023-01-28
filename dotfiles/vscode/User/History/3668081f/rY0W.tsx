import { useState } from 'react';
import HomePage from '../components/pages/home';
import SimpleHome from '../components/pages/home-simple/SimpleHome';
import BilboLegalFootnotes from '../components/pages/_global/BilboLegalFootnotes';
import { Footer, Header, MainContent } from '../components/sormus';
import useHeroHeader from '../hooks/useHeroHeader';
import { t } from '../public/locales/LocaleContext';
import checkFeatureFlag from '../utils/checkFeatureFlag';
export { getServerSideProps } from '../utils/addURLSubpathForLocale';

export const Home = () => {
  const { headerRef, headerHeight, updateHeaderHeight } = useHeroHeader();
  const [dynamicPageClasses, setDynamicPageClasses] = useState<string>('');
  const simpleEnabled =
    checkFeatureFlag('enable-simple') ||
    (process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_ENABLE_SIMPLE);
  if (simpleEnabled) return <SimpleHome />;
  return (
    <div className="tailwind">
      <div className={`transition-colors duration-200 ${dynamicPageClasses}`}>
        <Header
          bordered={false}
          ref={headerRef}
          shopButton={{ label: t('header_shop_now') }}
          showCart
          showDiscountBanner
          onHeaderUpdate={() => updateHeaderHeight()}
          inverse
        />

        <MainContent>
          <HomePage
            headerHeight={headerHeight}
            setDynamicPageClasses={setDynamicPageClasses}
          />
          <BilboLegalFootnotes pageName="home" />
        </MainContent>

        <Footer />
      </div>
    </div>
  );
};

Home.pageName =
  'Oura Ring | Accurate Health Information Accessible to Everyone';

export default Home;
