import { ReactElement } from 'react';
import { s3toImgix } from '../../assetUrls';
import Image from '../../sormus/Image';

interface LineItemImageProps {
  productData: any;
  lineItem: any;
  className?: any;
  width: string;
}
const LineItemImage = ({
  productData,
  lineItem,
  className,
  width,
}: LineItemImageProps): ReactElement => {
  if (!productData || !lineItem) return null;

  const imageSrc =
    productData?.lineItemImage?.originalSrc ||
    lineItem.image?.[0].originalSrc ||
    lineItem.images?.[0].originalSrc;

  const productHandle = lineItem.handle || lineItem.product.handle;

  return (
    <div className={className}>
      <Image
        className={imageClassName}
        src={s3toImgix(imageSrc, {
          fm: 'webp',
          width,
        })}
        alt={productHandle}
        data-cy="product-image"
      />
    </div>
  );
};

export default LineItemImage;
