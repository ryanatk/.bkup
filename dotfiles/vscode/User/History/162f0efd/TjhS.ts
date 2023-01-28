export interface ProductImage {
  originalSrc: string;
  alt: string | null;
}

const PRODUCT_IMAGES: ProductImage[] = [
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01-heritage@2x.png',
    alt: 'horizon silver gold ring slide 1',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-02-heritage@2x.png',
    alt: 'horizon silver gold ring slide 1',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-03-heritage@2x.png',
    alt: 'horizon silver gold ring slide 1',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/app_heartrate_975.png',
    alt: 'app showing heartrate',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/app_spo2_975.png',
    alt: 'app showing spo2',
  },
];

export default PRODUCT_IMAGES;
