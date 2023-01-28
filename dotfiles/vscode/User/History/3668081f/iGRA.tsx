import { useState } from 'react';
import HomePage from '../components/pages/home';
import BilboLegalFootnotes from '../components/pages/_global/BilboLegalFootnotes';
import { Footer, Header } from '../components/sormus';
import Main from '../components/sormus/Main';
import useHeroHeader from '../hooks/useHeroHeader';
import { t } from '../public/locales/LocaleContext';
export { getServerSideProps } from '../utils/addURLSubpathForLocale';

export const Home = () => {
  const { headerRef, headerHeight, updateHeaderHeight } = useHeroHeader();
  const [dynamicPageClasses, setDynamicPageClasses] = useState<string>('');

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
        <Main>
          <HomePage
            headerHeight={headerHeight}
            setDynamicPageClasses={setDynamicPageClasses}
          />
          <BilboLegalFootnotes pageName="home" />
        </Main>
        <Footer />
      </div>
    </div>
  );
};

Home.pageName =
  'Oura Ring | Accurate Health Information Accessible to Everyone';

export default Home;
