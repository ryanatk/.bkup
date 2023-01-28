import ImgixClient from 'imgix-core-js';

export interface BackgroundImage {
  backgroundImage: string;
}

export interface CDNOptions {
  fm?: string;
  w?: string;
  dpr?: string;
}

const client = new ImgixClient({
  domain: process.env.IMGIX_DOMAIN,
  secureURLToken: process.env.IMGIX_SECRET,
});

export const processS3Image = (
  path: any,
  format = 'jpg',
  uniqueHash = '',
): string => {
  const pathString = `${path}.${format}${uniqueHash && '?' + uniqueHash}`;
  return `https://s3.amazonaws.com/ouraring.com/images/${pathString}`;
};

export const backgroundImage = (
  path: string,
  maxWidth = 1600,
  format = 'jpg',
  uniqueHash = '',
  ar = '',
): BackgroundImage => {
  const generateDPR = (path: any, format: string, uniqueHash: string) => {
    const dprs = [1, 2, 3];

    const imageArray = dprs.map((dpr) => {
      return `url(${client.buildURL(processS3Image(path, format, uniqueHash), {
        w: maxWidth,
        dpr,
        ar,
        fit: ar ? 'crop' : '',
        fm: 'webp',
      })}) ${dpr}x`;
    });

    const toString = imageArray.join(',');
    return toString;
  };

  return {
    backgroundImage: `image-set(${generateDPR(path, format, uniqueHash)})`,
  };
};

export const srcSet = (
  path: string,
  format = 'jpg',
  widths = [100, 320, 600, 768, 1024, 1200, 1600, 2000],
  uniqueHash = '',
  params = {},
): {
  src: string;
  srcSet: string;
} => {
  return {
    srcSet: client.buildSrcSet(
      processS3Image(path, format, uniqueHash),
      {
        fm: 'webp',
        ...params,
      },
      {
        widths,
      },
    ),
    src: client.buildURL(processS3Image(path, format, uniqueHash), {
      fm: 'webp',
    }),
  };
};

// Helper to get `src` back for an image, when srcSet is not needed,
//   for example, when using media query.
// Accepts an optional `width`, to save bandwidth.
export const src = (
  path: string,
  format = 'jpg',
  width = 2160, // reasonable default size for an image
  uniqueHash = '',
): string => {
  return client.buildURL(processS3Image(path, format, uniqueHash), {
    fm: 'webp',
    w: width,
  });
};

/*
  Returns a generated srcSet field for the given widths.

  Similar to srcset() but this function takes a full URL instead of path & format.
*/
export function srcSetFromUrl(
  originalSrc: string,
  widths: number[],
  cdnOptions?: CDNOptions,
): string {
  return client.buildSrcSet(originalSrc, cdnOptions, {
    widths,
  });
}

/*
  Returns a generated srcSet field for the given images
*/
export function srcSetFromImages(
  images: { originalSrc: string; width: number }[],
): string {
  const srcSetArray = [];

  for (const image of images) {
    const cdnUrl = buildURL(image.originalSrc, {
      w: image.width + '',
    });

    srcSetArray.push(`${cdnUrl} ${image.width}w`);
  }

  return srcSetArray.join(', ');
}

/*
  Return a generated srcSet field for the given DPRs.

  Similar to dprSrcSet() but this function takes a full URL instead of path & format.
*/
export function dprSrcSetFromUrl(
  originalSrc: string,
  dprs: number[],
  cdnOptions: CDNOptions = {},
): string {
  const srcSetArray = [];

  for (const dpr of dprs) {
    const cdnUrl = buildURL(originalSrc, {
      dpr: dpr + '',
      ...cdnOptions,
    });

    srcSetArray.push(`${cdnUrl} ${dpr}x`);
  }

  return srcSetArray.join(', ');
}

export const dprSrcSet = (
  path: string,
  format = 'jpg',
  maxWidth = 800,
  dprs = [1, 2, 3],
  uniqueHash = '',
): {
  src: string;
  srcSet: string;
} => {
  const buildSrcSet = () => {
    const srcSetArray = [];

    dprs.forEach((dpr) => {
      const srcString = client.buildURL(
        processS3Image(path, format, uniqueHash),
        {
          fm: 'webp',
          dpr,
          w: maxWidth,
        },
      );

      srcSetArray.push(`${srcString} ${dpr}x`);
    });

    return srcSetArray.join(',');
  };

  return {
    srcSet: buildSrcSet(),
    src: client.buildURL(processS3Image(path, format, uniqueHash), {
      fm: 'webp',
    }),
  };
};

export const buildURL = (
  path: string,
  options: { fm?: string; W?: string; w?: string },
) => client.buildURL(path, options);

export const backgroundCover = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
