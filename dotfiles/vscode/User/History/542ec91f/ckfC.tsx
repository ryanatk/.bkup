import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import { Image, Typography } from '../../sormus';
import { useCartState } from './hooks/useCartState';
import useLineItemImage from './hooks/useLineItemImage';
import useRingFeatures from './hooks/useRingFeatures';
import { LineItemProductProps } from './LineItemProduct';
import LineItemProductDescription from './LineItemProductDescription';
import LineItemProductPrice from './LineItemProductPrice';
import LineItemProductRemove from './LineItemProductRemove';
import ProductFeatures from './ProductFeatures';

const Wrapper = tw.div`
  flex
  items-start
`;

const Alert = tw.p`
  bg-ensoBlue/[0.3]
  inline-block
  leading-relaxed
  mb-2
  px-2
  rounded
  tracking-[0.18em]
  text-helsinkiBlue-dark
  text-[0.625rem]
  uppercase
  md:(mb-3 text-xs leading-loose)
`;

const ImageWrapper = tw.div`
  flex-none
  mr-5
  md:mr-16
  lg:mr-32
`;

const Content = tw.div`
  flex-1
`;

const Actions = tw.div`
  flex
  flex-col
  flex-none
  gap-y-1
  items-end
  ml-5
  md:ml-10
  lg:(gap-y-3 ml-20)
`;

const LineItemProductParent = ({
  lineItem,
  product,
  alert,
}: LineItemProductProps): JSX.Element => {
  const { maxChargersPerOrder, maxRingsPerOrder } = useCartState();
  const ringFeatures = useRingFeatures();
  const imageData = useLineItemImage(lineItem, product);
  const passThruProps = { lineItem, product };

  return (
    <Wrapper data-cy="cart-line-item-product" data-id={lineItem.id}>
      {imageData && (
        <ImageWrapper>
          <Image
            className="w-14 md:w-24 lg:w-40"
            data-cy="product-image"
            originalSrc={imageData.originalSrc}
            responsiveWidths={[112, 192, 320]}
            alt={imageData.alt}
            cdnOptions={{ trim: 'color', trimcolor: 'transparent' }}
          />
        </ImageWrapper>
      )}
      <Content>
        {alert && (
          <Alert data-cy="cart-alert-message">
            {t(alert, {
              maxChargers: maxChargersPerOrder,
              maxRings: maxRingsPerOrder,
            })}
          </Alert>
        )}
        <div css={tw`flex`}>
          <div css={tw`flex-1`}>
            <Typography
              Element="h2"
              variant="h4"
              color="helsinkiBlue-dark"
              weight="normal"
              data-cy="product-title"
            >
              {product.title}
            </Typography>
            <div css={tw`flex items-center`}>
              <LineItemProductDescription {...passThruProps} isParent />
            </div>
            {product.isRing && (
              <div css={tw`mt-6 hidden md:block`}>
                <ProductFeatures features={ringFeatures} />
              </div>
            )}
          </div>
          <Actions>
            <LineItemProductPrice {...passThruProps} />
            <LineItemProductRemove {...passThruProps} />
          </Actions>
        </div>
      </Content>
    </Wrapper>
  );
};

export default LineItemProductParent;
