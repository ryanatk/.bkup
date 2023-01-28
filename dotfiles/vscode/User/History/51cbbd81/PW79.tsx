import { ButtonGroupProps } from 'react-multi-carousel';
import tw from 'twin.macro';
import { PDPData_content_productByHandle_images } from '../../../queries/types/PDPData';
import { Image } from '../../sormus';
import ProductSlideshowThumbnail from './ProductSlideshowThumbnail';

const ButtonWrapper = tw.div`
  flex
  flex-1
  justify-center
  gap-x-2
  gap-y-2
  max-w-sm
  my-0
  mx-auto
  mt-10
  lg:mt-6
`;

interface ProductSlideShowNavProps extends ButtonGroupProps {
  images: PDPData_content_productByHandle_images[];
  onChange: (idx: number) => void;
}

type CurrentTarget = {
  currentTarget: {
    value: string;
  };
};

export const ProductSlideshowNavigation = ({
  carouselState,
  images,
  goToSlide,
  onChange,
}: ProductSlideShowNavProps): JSX.Element => {
  const currentSlideIndex = carouselState.currentSlide;

  const handleChange = ({ currentTarget }: CurrentTarget) => {
    const nextSlideIndex = Number(currentTarget.value);
    onChange(nextSlideIndex);
    goToSlide(nextSlideIndex);
  };

  return (
    <ButtonWrapper>
      {images.map(({ alt, originalSrc, thumbnailSrc }, idx: number) => (
        <ProductSlideshowThumbnail
          key={`pdp-slideshow-thumbnail-${idx}`}
          index={idx}
          isSelected={currentSlideIndex === idx}
          onClick={handleChange}
          image={
            <>
              <Image
                alt={alt}
                originalSrc={originalSrc}
                thumbnailSrc={thumbnailSrc}
                isThumbnail={true}
                width={72}
                className="h-full w-full"
                style={{
                  aspectRatio: '4/3', // tailwind v2 plugin does not work as expected
                }}
              />
              {idx}
            </>
          }
        />
      ))}
    </ButtonWrapper>
  );
};

export default ProductSlideshowNavigation;
