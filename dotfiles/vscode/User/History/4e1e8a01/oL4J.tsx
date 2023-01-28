import Link from 'next/link';
import { ReactElement } from 'react';
import { s3toImgix } from '../../assetUrls';
import Image from '../../sormus/Image';

interface LineItemImageProps {
  productData: any;
  lineItem: any;
  className?: any;
}
const LineItemImage = ({
  productData,
  lineItem,
  className,
}: LineItemImageProps): ReactElement => {
  if (!productData || !lineItem) return null;

  const imageSrc =
    productData?.lineItemImage?.originalSrc ||
    (lineItem.image && lineItem.image[0].originalSrc) ||
    (lineItem.images && lineItem.images[0].originalSrc);

  const productHandle = lineItem.handle
    ? lineItem.handle
    : lineItem.product.handle;

  const ProductImage = () => (
    <Image
      src={s3toImgix(imageSrc, {
        fm: 'webp',
        width: '70',
      })}
      alt={productHandle}
      data-cy="product-image"
      className="w-16 h-auto"
    />
  );

  return (
    <div className={className}>
      <Link href={`/product/${productHandle}`}>
        <>
          <ProductImage />
        </>
      </Link>
    </div>
  );
};

export default LineItemImage;
