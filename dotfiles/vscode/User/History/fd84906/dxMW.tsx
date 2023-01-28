import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../../../analytics';
import ProductInnerPotential from '../../../components/pages/product-bilbo/ProductInnerPotential';
import ProductLifestyle from '../../../components/pages/product-bilbo/ProductLifestyle';
import ProductOuraDifference from '../../../components/pages/product-bilbo/ProductOuraDifference';
import ProductSelect from '../../../components/pages/product-bilbo/ProductSelect';
import ProductSpecs from '../../../components/pages/product-bilbo/ProductSpecs';
import BilboLegalFootnotes from '../../../components/pages/_global/BilboLegalFootnotes';
import {
  Footer,
  Header,
  PageContainer,
  Redirect,
} from '../../../components/sormus';
import fetchPageDetails from '../../../data-mock/api/fetch-page-details';
import usePdpDiscountData from '../../../helpers/discounts/usePdpDiscountData';
import { fetchPDPData, PDPData } from '../../../queries/PDPData';
import { reqAnalyticsEvent } from '../../../stores/app/actions';
import { getDiscountsSelector } from '../../../stores/discounts/selectors';
import Product from '../../../types/Product';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import getDiscountMessage from '../../../utils/getDiscountMessage';

export interface PDPProps {
  pdpData: PDPData;
  query: any;
}

export const CHARGER_SET = 'charger-set';

const PDP = ({ pdpData, query }: PDPProps) => {
  const dispatch = useDispatch();
  const { handle } = query;
  const product = pdpData.content.productByHandle;
  const chargerSetDisabled = checkFeatureFlag('hide-charger-set');
  const gollumEnabled = checkFeatureFlag('enable-gollum');
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
    dispatch(
      reqAnalyticsEvent({
        type: EventType.ProductViewed,
        // @ts-ignore
        payload: { product },
      }),
    );
  }, []);

  const isChargerSet = handle === CHARGER_SET;

  if (chargerSetDisabled && isChargerSet)
    return <Redirect path="/product/heritage-silver" />;

  if (!product) return <Redirect path="/404" />;

  return (
    <div className="tailwind">
      <div className="bg-sand-light">
        <Header
          shopButton={false}
          showDiscountBanner={showDiscountBanner()}
          bordered
        />
        <PageContainer
          name={`pdp-${handle}`}
          className="bg-sand-light pt-4 md:pt-16"
          padding="none"
        >
          {/* @TODO: should take a look at unifying the types between queries and state */}
          <ProductSelect product={product as unknown as Product} />
          {!isChargerSet && (
            <>
              {/* <ProductComparison /> */}
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
        <Footer />
      </div>
    </div>
  );
};

PDP.getInitialProps = async ({ query, store }) => {
  let pdpData: PDPData;
  const state = store.getState();
  try {
    pdpData = await fetchPDPData({
      productHandle: query.handle,
      currency: state.app && state.app.currency,
    });
  } catch (err) {
    console.error(err);
  }

  const details = fetchPageDetails('product');

  return { details, query, pdpData };
};

PDP.isSormusCompatible = true;
PDP.pageName = 'ProductPage';
export default PDP;
