import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ProductProvider } from '../../../contexts/ProductContext';
import { MessageKey } from '../../../public/locales/setup';
import { PDPData_content_productByHandle } from '../../../queries/types/PDPData';
import isAccessory from '../../../utils/isAccessory';
import { Footer, Header, PageContainer } from '../../sormus';
import ProductBreakthrough from './ProductBreakthrough';
import ProductFeatures from './ProductFeatures';
import ProductHeader from './ProductHeader';
import ProductQuotes from './ProductQuotes';
import ProductResearch from './ProductResearch';

const HorizonPDP = ({
  product,
  handle,
  discount,
}: {
  product: PDPData_content_productByHandle;
  handle: string | string[];
  discount: MessageKey;
}): JSX.Element => {
  const { formatMessage } = useIntl();
  const { title, description } = useMemo(() => {
    const seo = product?.seoParams;
    const title = seo?.title && formatMessage({ id: seo?.title });
    const description =
      seo?.description && formatMessage({ id: seo?.description });

    return { title, description };
  }, [formatMessage, product?.seoParams]);

  return (
    <ProductProvider>
      <NextSeo title={title} description={description} />

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
          </PageContainer>
          <Footer />
        </div>
      </div>
    </ProductProvider>
  );
};

export default HorizonPDP;
