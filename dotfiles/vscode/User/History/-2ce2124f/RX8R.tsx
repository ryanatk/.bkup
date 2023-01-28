import { ReactElement, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { PDPData_content_productByHandle_images } from '../../../../../queries/types/PDPData';
import { Image } from '../../../../sormus';
import MultiCarousel, {
  ResponsiveType,
} from '../../../../sormus/MultiCarousel';
import { RESPONSIVE_DATA } from '../../../../sormus/MultiCarousel/constants';
import ProductSlideshowNavigation from '../../../product/ProductSlideshowNavigation';
import { PRODUCT_IMAGES } from '../data';

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

const images: PDPData_content_productByHandle_images[] = PRODUCT_IMAGES.map(
  (image) => ({
    // additional properties make the type work
    __typename: 'ProductImage',
    thumbnailSrc: null,
    fullBleedThumbnail: null,
    ...image,
  }),
);

const FsaProductSlideshow = (): ReactElement => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleChange = (nextSlide: number) => {
    setActiveSlide(nextSlide);
  };

  return (
    <section aria-label="Product image slideshow">
      <MultiCarousel
        arrows={false}
        shouldResetAutoplay={false}
        autoPlay={false}
        showDots={false}
        renderButtonGroupOutside={true}
        responsive={RESPONSIVE}
        beforeChange={(nextIndex) => setActiveSlide(nextIndex)}
        customButtonGroup={
          <ProductSlideshowNavigation images={images} onChange={handleChange} />
        }
      >
        {images.map(({ alt, originalSrc }, idx) => (
          <ImageWrapper key={originalSrc} isActive={activeSlide === idx}>
            <Image
              draggable="false"
              originalSrc={originalSrc}
              alt={alt}
              width={975}
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
