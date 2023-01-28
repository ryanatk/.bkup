import { useEffect, useMemo, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import tw, { styled } from 'twin.macro';
import { RingStyle, useProduct } from '../../../contexts/ProductContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { PDPData_content_productByHandle_images } from '../../../queries/types/PDPData';
import { Image, Typography, Video } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import MultiCarousel, {
  ButtonGroupProps,
  ResponsiveType,
} from '../../sormus/MultiCarousel';
import { RESPONSIVE_DATA } from '../../sormus/MultiCarousel/constants';
import ProductSlideshowNavigation from './ProductSlideshowNavigation';

const ImageWrapper = styled.div(({ isActive }) => [
  tw`
    pointer-events-none
  `,
  `user-select: none;`,
  isActive
    ? `opacity: 1;
         transition: opacity 750ms linear;`
    : `opacity: 0;
         transition: opacity 100ms linear;`,
]);

const FlexBox = tw.div`
  flex 
  justify-center 
  mt-8
`;

const Tag = tw.div`
  py-2 
  px-4 
  bg-ensoBlue-light 
  border 
  rounded
`;

const TagText = styled(Typography)`
  letter-spacing: 0.25em;
  ${tw`
    text-caption 
    font-sans
    uppercase
  `}
`;

const RESPONSIVE: ResponsiveType = {
  desktop: { ...RESPONSIVE_DATA.desktop, items: 1 },
  tablet: { ...RESPONSIVE_DATA.tablet, items: 1 },
  mobile: { ...RESPONSIVE_DATA.mobile, items: 1 },
};

interface CustomButtonGroupProps extends ButtonGroupProps {
  images: PDPData_content_productByHandle_images[];
  onChange: (nextSlide: number) => void;
  style: RingStyle;
}

const CustomButtonGroup = ({
  images,
  onChange,
  style,
  ...props
}: CustomButtonGroupProps) => (
  <>
    {style === RingStyle.Horizon && (
      <FlexBox>
        <Tag>
          <TagText Element="span">{t('new_style')}</TagText>
        </Tag>
      </FlexBox>
    )}
    <ProductSlideshowNavigation
      images={images}
      onChange={onChange}
      {...props}
    />
  </>
);

const ProductHorizonSlideshow = (): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { style, product } = useProduct();
  const productHandle = useMemo<string>(() => product?.handle, [product]);
  const carouselRef = useRef<Carousel>();

  const isMediumScreen = useMediaQuery(
    `(min-width:${breakpoints.medium}px) and (max-width:${
      breakpoints.large - 1
    }px)`,
  );

  const videoProps = {
    type: 'video/mp4',
    contentTitle: 'pdp_video',
    location: 'pdp_video',
    controls: false,
    loop: true,
    playsInline: true,
    muted: true,
    autoPlay: true,
  };

  const handleChange = (nextSlide: number) => {
    setActiveSlide(nextSlide);
  };

  // Always go back to the first image when a different finish/style is selected.
  useEffect(() => {
    setActiveSlide(0);
    carouselRef.current?.goToSlide(0);
  }, [productHandle]);

  if (!product) return null;

  const images: PDPData_content_productByHandle_images[] = product.images;

  return (
    <div className="sticky top-40">
      <MultiCarousel
        arrows={false}
        shouldResetAutoplay={false}
        autoPlay={false}
        showDots={false}
        renderButtonGroupOutside={true}
        responsive={RESPONSIVE}
        beforeChange={(nextIndex) => setActiveSlide(nextIndex)}
        customButtonGroup={
          <CustomButtonGroup
            images={product.images}
            onChange={handleChange}
            style={style}
          />
        }
        ref={carouselRef}
      >
        {images
          .filter(({ originalSrc }) => {
            console.log({ originalSrc }, originalSrc.includes('-02'));
            return !originalSrc.includes('-02');
          })
          .sort(({ originalSrc }) => (originalSrc.includes('.mp4') ? -1 : 0))
          .map(({ alt, originalSrc, thumbnailSrc }, idx) => (
            <ImageWrapper key={originalSrc} isActive={activeSlide === idx}>
              {originalSrc.includes('.mp4') ? (
                <Video
                  {...videoProps}
                  src={originalSrc}
                  playVideo={activeSlide === idx}
                  altImageSrc={thumbnailSrc}
                />
              ) : (
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
              )}
            </ImageWrapper>
          ))}
      </MultiCarousel>
    </div>
  );
};

export default ProductHorizonSlideshow;
