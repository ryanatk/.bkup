import { ReactElement, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import tw, { styled } from 'twin.macro';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { PDPData_content_productByHandle_images } from '../../../queries/types/PDPData';
import { Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import MultiCarousel, {
  ButtonGroupProps,
  ResponsiveType,
} from '../../sormus/MultiCarousel';
import { RESPONSIVE_DATA } from '../../sormus/MultiCarousel/constants';
import ProductSlideshowNavigation from '../product-horizon/ProductSlideshowNavigation';
import { PRODUCT_IMAGES } from './data';

const ImageWrapper = styled.div(({ isActive }) => [
  tw`
    pointer-events-none
  `,
  `user-select: none;`,
  isActive
    ? `
      opacity: 1;
      transition: opacity 750ms linear, visibility 750ms linear;
      visibility: visible;
    `
    : `
      opacity: 0;
      transition: opacity 100ms linear, visibility 100ms linear;
      visibility: hidden;
    `,
]);

const RESPONSIVE: ResponsiveType = {
  desktop: { ...RESPONSIVE_DATA.desktop, items: 1 },
  tablet: { ...RESPONSIVE_DATA.tablet, items: 1 },
  mobile: { ...RESPONSIVE_DATA.mobile, items: 1 },
};

interface CustomButtonGroupProps extends ButtonGroupProps {
  images: PDPData_content_productByHandle_images[];
  onChange: (nextSlide: number) => void;
}

const CustomButtonGroup = ({
  images,
  onChange,
  ...props
}: CustomButtonGroupProps) => (
  <ProductSlideshowNavigation images={images} onChange={onChange} {...props} />
);

const images: PDPData_content_productByHandle_images[] = PRODUCT_IMAGES.map(
  (image) => ({
    // makes the type work!
    __typename: 'ProductImage',
    thumbnailSrc: null,
    fullBleedThumbnail: null,
    ...image,
  }),
);

const FsaProductSlideshow = (): ReactElement => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const carouselRef = useRef<Carousel>();

  const isMediumScreen = useMediaQuery(
    `(min-width:${breakpoints.medium}px) and (max-width:${
      breakpoints.large - 1
    }px)`,
  );

  const handleChange = (nextSlide: number) => {
    setActiveSlide(nextSlide);
  };

  return (
    <section className="sticky top-40" aria-label="Product image slideshow">
      <MultiCarousel
        arrows={false}
        shouldResetAutoplay={false}
        autoPlay={false}
        showDots={false}
        renderButtonGroupOutside={true}
        responsive={RESPONSIVE}
        beforeChange={(nextIndex) => setActiveSlide(nextIndex)}
        customButtonGroup={
          <CustomButtonGroup images={images} onChange={handleChange} />
        }
        ref={carouselRef}
      >
        {images.map(({ alt, originalSrc }, idx) => (
          <ImageWrapper key={originalSrc} isActive={activeSlide === idx}>
            <Image
              draggable="false"
              originalSrc={originalSrc}
              alt={alt}
              width={isMediumScreen ? 975 : 684}
              className="w-full"
              style={{
                aspectRatio: '4/3', // tailwind v2 plugin does not work as expected
              }}
            />
          </ImageWrapper>
        ))}
      </MultiCarousel>
    </section>
  );
};

export default FsaProductSlideshow;
