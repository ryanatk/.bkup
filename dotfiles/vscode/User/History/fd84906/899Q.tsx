import { NextSeo } from 'next-seo';
// import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'twin.macro';
import { EventType } from '../../../analytics';
import ProductInnerPotential from '../../../components/pages/product-bilbo/ProductInnerPotential';
import ProductLifestyle from '../../../components/pages/product-bilbo/ProductLifestyle';
import ProductOuraDifference from '../../../components/pages/product-bilbo/ProductOuraDifference';
import ProductSelect from '../../../components/pages/product-bilbo/ProductSelect';
import ProductSpecs from '../../../components/pages/product-bilbo/ProductSpecs';
import HorizonPDP from '../../../components/pages/product-horizon/HorizonPDP';
import LegalFootnotes from '../../../components/pages/_global/LegalFootnotes';
import {
  Footer,
  Header,
  MainContent,
  PageContainer,
  Redirect,
} from '../../../components/sormus';
import { breakpoints } from '../../../components/sormus/constants';
import { noFollow, noIndex } from '../../../config/seoConfig';
import {
  AFFIRM_FOOTNOTE,
  Footnote,
  SPO2_FOOTNOTE,
} from '../../../consts/legal-footnotes';
import usePdpDiscountData from '../../../helpers/discounts/usePdpDiscountData';
import useDisplayAffirm from '../../../hooks/useDisplayAffirm';
import useHeroHeader from '../../../hooks/useHeroHeader';
import { useProduct } from '../../../hooks/useProduct';
import { reqAnalyticsEvent } from '../../../stores/app/actions';
import { getDiscountsSelector } from '../../../stores/discounts/selectors';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getDiscountMessage from '../../../utils/getDiscountMessage';

/**
 * This export of getServerSideProps is important for internationalized subpath routing.
 * DO NOT REMOVE
 */
export { getServerSideProps } from '../../../utils/addURLSubpathForLocale';

const height = (headerHeight: number) => `calc(100vh - ${headerHeight}px)`;

const Section = styled.section(({ headerHeight }) => ({
  minHeight: height(headerHeight),

  [`@media (min-width: ${breakpoints.large}px) and (min-height: 850px)`]: {
    height: height(headerHeight),
    maxHeight: 812,
    minHeight: 'auto',
  },
}));

interface Props {
  renderDiscountLink?: string;
}

const useFootnotes = (): Footnote[] => {
  const displayAffirm = useDisplayAffirm();
  const spO2Enabled = checkFeatureFlag('spo2-launch-copy-update');
  const footnotes = [];
  if (displayAffirm) footnotes.push(AFFIRM_FOOTNOTE);
  if (!spO2Enabled) footnotes.push(SPO2_FOOTNOTE);
  return footnotes;
};

const PDP = (props: Props = {}): JSX.Element => {
  const { handle, isChargerSet, product, remoteDataResolved } = useProduct({
    renderDiscountLink: props.renderDiscountLink,
  });
  console.log({ product });
  const dispatch = useDispatch();

  const chargerSetDisabled = checkFeatureFlag('hide-charger-set');
  const horizonEnabled = checkFeatureFlag('enable-horizon');
  const isRAFMessageEnabled = checkFeatureFlag('enable-raf-messaging');
  const pdpDiscountData = usePdpDiscountData();
  const discountState = useSelector(getDiscountsSelector);
  const discount = getDiscountMessage(
    pdpDiscountData,
    discountState,
    isRAFMessageEnabled,
  );

  const footnotes = useFootnotes();

  useEffect(() => {
    if (product) {
      dispatch(
        reqAnalyticsEvent({
          type: EventType.ProductViewed,
          payload: { product },
        }),
      );
    }
  }, [product]);

  const { headerRef, headerHeight } = useHeroHeader();

  if (chargerSetDisabled && isChargerSet)
    return (
      <Redirect
        path={
          horizonEnabled
            ? '/product/horizon-silver'
            : '/product/heritage-silver'
        }
      />
    );
  if (horizonEnabled)
    return <HorizonPDP product={product} handle={handle} discount={discount} />;

  if (!product && remoteDataResolved) return <Redirect path="/404" />;

  const seoParams = {
    title: `Oura Ring product ${handle}`,
    description: 'Oura Ring Product',
    noFollow: noFollow,
    noIndex: noIndex,
  };
  return (
    <div className="tailwind">
      <div className="bg-sand-light">
        {/* <Head>
          <link rel="preload" src={} />
        </Head> */}
        <NextSeo {...seoParams} />
        <Header
          ref={headerRef}
          shopButton={false}
          showDiscountBanner={!!discount}
          bordered
        />

        <MainContent>
          <PageContainer
            name={`pdp-${handle}`}
            className="bg-sand-light pt-4 md:pt-16"
            padding="none"
          >
            <Section headerHeight={headerHeight}>
              {product && <ProductSelect product={product} />}
            </Section>
            {!isChargerSet && (
              <>
                <section className="py-24 bg-sand">
                  <ProductLifestyle />
                </section>
                <section className="py-24 bg-sand-light">
                  <ProductInnerPotential />
                </section>
                <section className="bg-sand py-24">
                  <ProductOuraDifference />
                </section>
                <ProductSpecs />
                <LegalFootnotes footnotes={footnotes} />
              </>
            )}
          </PageContainer>
        </MainContent>
        <Footer />
      </div>
    </div>
  );
};

PDP.isSormusCompatible = true;
PDP.pageName = 'Product';
export default PDP;
