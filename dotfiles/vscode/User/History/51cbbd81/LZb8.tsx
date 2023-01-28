import { ButtonGroupProps } from 'react-multi-carousel';
import tw from 'twin.macro';
import { PDPData_content_productByHandle_images } from '../../../queries/types/PDPData';
import { Image } from '../../sormus';
import SelectButton from '../../sormus/SelectButton';

const ButtonWrapper = tw.div`
  flex
  flex-1
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
      {images.map(
        (
          { alt, fullBleedThumbnail, originalSrc, thumbnailSrc },
          idx: number,
        ) => {
          const isCurrentImage = currentSlideIndex === idx;

          return (
            <SelectButton
              key={`ring-${idx}`}
              aria-label={`Jump to slide ${idx}`}
              css={[
                tw`w-1/6 py-0 overflow-hidden`,
                fullBleedThumbnail && tw`p-0`,
              ]}
              value={`${idx}`}
              isSelected={isCurrentImage}
              onClick={handleChange}
              image={
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
              }
            />
          );
        },
      )}
    </ButtonWrapper>
  );
};

export default ProductSlideshowNavigation;
