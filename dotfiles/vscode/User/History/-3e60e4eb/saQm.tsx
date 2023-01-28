import { ComponentPropsWithoutRef } from 'react';
import tw, { styled } from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';

export interface ProductSlideshowThumbnailProps
  extends ComponentPropsWithoutRef<'button'> {
  value: number;
  image: JSX.Element;
  isSelected?: boolean;
}

const Button = styled.button(
  ({ isSelected }: Omit<ProductSlideshowThumbnailProps, 'image' | 'index'>) => [
    tw`
      border
      border-gray-300
      px-2
      py-4
      rounded
      transition-all
      flex-grow
      w-1/6
      overflow-hidden
      text-grayscale-text
      hover:(bg-helsinkiBlue bg-opacity-5)
    `,
    isSelected &&
      tw`
        bg-helsinkiBlue
        bg-opacity-5
        border-helsinkiBlue
        text-helsinkiBlue
    `,
    `max-width: 5.5rem`,
  ],
);

const ImageWrapper = tw.div`
  flex
  justify-center
`;

const ProductSlideshowThumbnail = ({
  onClick,
  value,
  image,
  isSelected = false,
  ...props
}: ProductSlideshowThumbnailProps): JSX.Element => (
  <Button
    type="button"
    aria-current={isSelected}
    onClick={onClick}
    isSelected={isSelected}
    {...props}
  >
    <ImageWrapper aria-hidden="true">{image}</ImageWrapper>
    <span className="sr-only">
      {t('pdp_slideshow_thumbnail_label', {
        value,
      })}
    </span>
  </Button>
);

export default ProductSlideshowThumbnail;
