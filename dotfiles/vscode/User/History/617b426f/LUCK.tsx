import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { noFollow, noIndex } from '../../../config/seoConfig';
import {
  Footnote,
  HORIZON_PDP_MEMBERSHIP_FOOTNOTE,
} from '../../../consts/legal-footnotes';
import { ProductProvider } from '../../../contexts/ProductContext';
import { CHARGER_SET } from '../../../hooks/useProduct';
import { MessageKey } from '../../../public/locales/setup';
import { PDPData_content_productByHandle } from '../../../queries/types/PDPData';
import isAccessory from '../../../utils/isAccessory';
import { Footer, Header, PageContainer } from '../../sormus';
import LegalFootnotes from '../_global/LegalFootnotes';
import ProductBreakthrough from './ProductBreakthrough';
import ProductFeatures from './ProductFeatures';
import ProductHeader from './ProductHeader';
import ProductQuotes from './ProductQuotes';
import ProductResearch from './ProductResearch';

const useFootnotes = (isChargerSet = false): Footnote[] => {
  const footnotes: Footnote[] = [];
  if (!isChargerSet) footnotes.push(HORIZON_PDP_MEMBERSHIP_FOOTNOTE);
  return footnotes;
};

const HorizonPDP = ({
  product,
  handle,
  discount,
}: {
  product: PDPData_content_productByHandle;
  handle: string | string[];
  discount: MessageKey;
}): JSX.Element => {
  const seoParams = useMemo(() => {
    const { formatMessage } = useIntl();
          const seoParams = {
            title: formatMessage({ id: product?.seoParams?.title }),
            description: formatMessage({ id: product?.seoParams?.description }),
        nofollow: noFollow,
        noindex: noIndex,
          }

  const isChargerSet = handle === CHARGER_SET;
  const footnotes = useFootnotes(isChargerSet);
  return (
    <ProductProvider>
      <NextSeo {...seoParams } />

      <div className="tailwind">
        <div className="bg-sand-light">
          <Header shopButton={false} bordered showDiscountBanner={!!discount} />
          <PageContainer
            name={`horizon-pdp-${handle}`}
            padding="none"
            className="pt-4 md:pt-16"
          >
            <ProductHeader product={product} />
            {!isAccessory(handle) && (
              <>
                <ProductBreakthrough />
                <ProductQuotes />
                <ProductFeatures />
                <ProductResearch />
              </>
            )}
            <LegalFootnotes footnotes={footnotes} />
          </PageContainer>
          <Footer />
        </div>
      </div>
    </ProductProvider>
  );
};

export default HorizonPDP;
