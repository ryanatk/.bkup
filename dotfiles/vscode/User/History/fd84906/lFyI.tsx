import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'twin.macro';
import { EventType } from '../../../analytics';
import HorizonPDP from '../../../components/pages/product-horizon/HorizonPDP';
import { Redirect } from '../../../components/sormus';
import { breakpoints } from '../../../components/sormus/constants';
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
  const dispatch = useDispatch();

  const chargerSetDisabled = checkFeatureFlag('hide-charger-set');
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
    return <Redirect path="/product/horizon-silver" />;

  return <HorizonPDP product={product} handle={handle} discount={discount} />;
};

PDP.isSormusCompatible = true;
PDP.pageName = 'Product';
export default PDP;
