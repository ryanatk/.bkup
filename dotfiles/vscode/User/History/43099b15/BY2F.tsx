import React, { ComponentPropsWithoutRef, LegacyRef } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
  buildURL,
  CDNOptions,
  dprSrcSetFromUrl,
  srcSetFromImages,
  srcSetFromUrl,
} from '../../../utils/imageHelpers';
import { breakpoints } from '../constants';

export interface ImageProps extends ComponentPropsWithoutRef<'img'> {
  /**
  Short path of the image asset. Looks like: "homepage/scores-sleep-ui.png". If provided, this will be used
  to populate the 'originalSrc' using our standard root path: https://s3.amazonaws.com/ouraring.com/images/
  */
  shortSrc?: string;
  /**
  URI of the full-size image asset. If provided, this will be used to generate 'src', by generating the Imgix CDN URL.
  */
  originalSrc?: string;
  /**
  URI of the thumbnail-size image asset. If provided, this will be used to generate 'src', by generating the Imgix CDN URL.
  */
  thumbnailSrc?: string;
  /**
   * Boolean that is used to render thumbnailSrc vs originalSrc.
   */
  isThumbnail?: boolean;
  /**
  Exact image src URI. If provided this will be used directly on the <img> tag.
  Using this field is not recommended - it's preferred to use 'originalSrc' instead.
  */
  src?: string;
  /** Image widths for a responsive image. If provided, this will add a srcSet="" field. This requires an 'originalSrc' prop. */
  responsiveWidths?: number[];
  /**
  List of responsive images. This is used if the image should switch between different filenames for different
  breakpoints. Cannot be used in combination with 'responsiveWidths'
  */
  responsiveImages?: SingleResponsiveImage[];
  /**
  DPR values for a responsive image. If provided, this will add a srcSet="" field. This requires an 'originalSrc' prop.
  Cannot be used in combination with 'responsiveWidths'
  */
  dprs?: number[];
  /** alt text */
  alt: string;
  /** img "loading" attribute */
  loading?: 'lazy' | 'eager';
  /** img "sizes" attribute */
  sizes?: string;
  /**
  whether to render image a background cover. This field is not recommneded because a few options (including loading=lazy)
  don't work as a background image.
  */
  cover?: boolean;
  /** optional width prop */
  width?: number;
  /** optional height prop */
  height?: number | string;
  /** max height for image when rendered as a cover on large screens */
  maxHeight?: number;
  /** optional id */
  id?: string;
  /** optional className */
  className?: string;
  /** Optional forwardedRef, this will be added as the React ref={} */
  forwardedRef?: LegacyRef<HTMLImageElement>;
  backgroundPosition?: string;
}

/**
  Single image entry when using the "responsiveImages" list.
*/
export interface SingleResponsiveImage {
  /** Short path of the image asset. Looks like: "homepage/scores-sleep-ui.png".  */
  shortSrc: string;

  /**
  (Intrinsic) pixel width. This will be used in the CDN params, and also in the "XXXw"
  suffix in the srcset list
  */
  width: number;
}

const StandardImageRootPath = 'https://s3.amazonaws.com/ouraring.com/images/';

function srcSetFromImageList(images: SingleResponsiveImage[]) {}

const Image = ({
  src,
  shortSrc,
  originalSrc,
  thumbnailSrc,
  isThumbnail = false,
  responsiveWidths,
  responsiveImages,
  dprs,
  alt,
  backgroundPosition,
  cover = false,
  width,
  height,
  maxHeight,
  id = '',
  className = '',
  forwardedRef,
  ...props
}: ImageProps): JSX.Element => {
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);

  let warning = undefined;

  if (process.env.NODE_ENV !== 'production') {
    // A bunch of dev-mode checks.
    if (originalSrc && originalSrc.indexOf('ouraring.imgix.net') !== -1) {
      warning =
        'originalSrc contained an imgix URL instead of an s3.amazonaws.com URL: ' +
        originalSrc;
    }

    if (src && src.indexOf('https://s3.amazonaws.com') === 0) {
      warning = 'src contained an S3 URL instead of a cdn URL: ' + src;
    }

    if (responsiveWidths && dprs) {
      warning = 'props contains both responsiveWidths and dprs';
    }

    if (responsiveWidths && !(originalSrc || shortSrc)) {
      warning = 'responsiveWidths is being used without an originalSrc';
    }

    if (dprs && !(originalSrc || shortSrc)) {
      warning = 'dprs is being used without an originalSrc';
    }

    if (warning) console.warn(warning);
  }

  let srcSet = undefined;

  const cdnOptions: CDNOptions = {
    fm: 'webp',
  };

  if (width != null) {
    cdnOptions.w = width + '';
  }

  if (!src && shortSrc) {
    originalSrc = StandardImageRootPath + shortSrc;
  }

  if (!src && originalSrc) {
    if (isThumbnail && thumbnailSrc) {
      src = buildURL(thumbnailSrc, cdnOptions);
    } else {
      src = buildURL(originalSrc, cdnOptions);
    }
  }

  if (originalSrc && responsiveWidths) {
    srcSet = srcSetFromUrl(originalSrc, responsiveWidths, cdnOptions);
  }

  if (responsiveImages) {
    srcSet = srcSetFromImages(
      responsiveImages.map((entry) => ({
        originalSrc: StandardImageRootPath + entry.shortSrc,
        width: entry.width,
      })),
    );
  }

  if (originalSrc && dprs) {
    srcSet = dprSrcSetFromUrl(originalSrc, dprs, cdnOptions);
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!src) {
      warning = 'no image src provided';
      console.warn(warning);
    }
  }

  return (
    <>
      {cover ? (
        <div
          style={{
            backgroundImage: `url(${src})`,
            height:
              typeof height === 'number'
                ? `${height}px`
                : typeof height === 'string'
                ? height
                : 'auto',
            maxHeight: !isMinWidthLarge ? maxHeight : 'auto',
            backgroundSize: 'cover',
            backgroundPosition: backgroundPosition ?? 'center',
          }}
          id={id}
          className={className}
          data-image-warning={warning}
          {...props}
        />
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          id={id}
          className={className + (Boolean(src) ? '' : ' invisible')}
          ref={forwardedRef}
          data-image-warning={warning}
          {...props}
        />
      )}
    </>
  );
};

export default Image;
