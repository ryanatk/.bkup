import cx from 'classnames';
import { ACTIVE_EXPERIMENT_ID as PDP_EXPERIMENT_ID } from '../../../../consts/experiments/pdp';
import useGoogleOptimizeVariant, {
  VariantId,
} from '../../../../hooks/useGoogleOptimizeVariant';
import Product from '../../../../types/Product';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import { SlideshowKaksi } from '../../../sormus';
import { abImages, HeritageRings } from './pdpCarouselTest/data';

interface Props {
  className?: string;
  product: Product;
  onNavNext: (index: number) => void;
  onNavPrev: (index: number) => void;
}

const ProductSlideshow = ({
  className,
  product,
  onNavNext,
  onNavPrev,
}: Props): JSX.Element => {
  const carouselImageResizeTest = checkFeatureFlag('pdp-carousel-image-test');
  const { ready, variantId } = useGoogleOptimizeVariant(
    PDP_EXPERIMENT_ID,
    carouselImageResizeTest ? 2000 : 0,
    'PDP carousel image resize',
  );

  const ringHandle = product.handle as HeritageRings;
  const isHeritageRing = Object.values(HeritageRings).includes(ringHandle);

  const slideShowImages = isHeritageRing // test is only relevant for heritage ring
    ? ready
      ? variantId === VariantId.One
        ? abImages[ringHandle]
        : product.images
      : [product.images[0]] // provides a default image, for the layout to settle
    : product.images;

  return (
    <div
      className={cx(className, {
        invisible: isHeritageRing && !ready, // hides the image, to keep a/b test even
      })}
    >
      <SlideshowKaksi
        items={slideShowImages.map((image, i) => ({
          originalSrc: image.originalSrc,
          responsiveWidths: [800, 600, 400],
          alt: image?.alt ?? '',
          content: () => null,
        }))}
        imageLoading="eager"
        onNavNext={onNavNext}
        onNavPrev={onNavPrev}
      />
    </div>
  );
};

export default ProductSlideshow;