import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../../../analytics';
import ProductInnerPotential from '../../../components/pages/product-bilbo/ProductInnerPotential';
import ProductLifestyle from '../../../components/pages/product-bilbo/ProductLifestyle';
import ProductOuraDifference from '../../../components/pages/product-bilbo/ProductOuraDifference';
import ProductSelect from '../../../components/pages/product-bilbo/ProductSelect';
import ProductSpecs from '../../../components/pages/product-bilbo/ProductSpecs';
import HorizonPDP from '../../../components/pages/product-horizon/HorizonPDP';
import BilboLegalFootnotes from '../../../components/pages/_global/BilboLegalFootnotes';
import {
  Footer,
  Header,
  MainContent,
  PageContainer,
  Redirect,
} from '../../../components/sormus';
import usePdpDiscountData from '../../../helpers/discounts/usePdpDiscountData';
import useHeroHeader from '../../../hooks/useHeroHeader';
import { useProduct } from '../../../hooks/useProduct';
import { reqAnalyticsEvent } from '../../../stores/app/actions';
import { getDiscountsSelector } from '../../../stores/discounts/selectors';
import Product from '../../../types/Product';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getDiscountMessage from '../../../utils/getDiscountMessage';
export { getServerSideProps } from '../../../utils/addURLSubpathForLocale';

const PDP = () => {
  const { handle, isChargerSet, product, remoteDataResolved } = useProduct();
  const dispatch = useDispatch();

  const chargerSetDisabled = checkFeatureFlag('hide-charger-set');
  const gollumEnabled = checkFeatureFlag('enable-gollum');
  const horizonEnabled = checkFeatureFlag('enable-horizon');
  const pdpDiscountData = usePdpDiscountData();
  const discountState = useSelector(getDiscountsSelector);
  const discount = getDiscountMessage(pdpDiscountData, discountState);
  const showDiscountBanner = () => {
    if (gollumEnabled) {
      if (discount) return true;
      else return false;
    } else return true;
  };

  /* 
  @TODO: As follow up. 
  There is a mismatch in typing between the products query and redux product type.
  Ignoring for now.
  */
  useEffect(() => {
    if (product) {
      dispatch(
        reqAnalyticsEvent({
          type: EventType.ProductViewed,
          // @ts-ignore
          payload: { product },
        }),
      );
    }
  }, [product]);

  const { headerRef, headerHeight } = useHeroHeader();

  if (horizonEnabled) return <HorizonPDP product={product} handle={handle} />;

  if (chargerSetDisabled && isChargerSet)
    return <Redirect path="/product/heritage-silver" />;

  if (!product && remoteDataResolved) return <Redirect path="/404" />;

  return (
    <div className="tailwind">
      <div className="bg-sand-light">
        <Header
          ref={headerRef}
          shopButton={false}
          showDiscountBanner={showDiscountBanner()}
          bordered
        />
        <MainContent>
        <PageContainer
          name={`pdp-${handle}`}
          className="bg-sand-light pt-4 md:pt-16"
          padding="none"
        >
          <div style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
            {/* @TODO: should take a look at unifying the types between queries and state */}
            {product && (
              <ProductSelect product={product as unknown as Product} />
            )}
          {!isChargerSet && (
            <>
              <div className="py-24 bg-sand">
                <ProductLifestyle />
              </div>
              <div className="py-24 bg-sand-light">
                <ProductInnerPotential />
              </div>
              <div className="bg-sand py-24">
                <ProductOuraDifference />
              </div>
              <ProductSpecs />
              <BilboLegalFootnotes pageName="pdp" />
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
PDP.pageName = 'ProductPage';
export default PDP;
