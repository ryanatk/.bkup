export interface ProductImage {
  originalSrc: string;
  alt: string | null;
}

const PRODUCT_IMAGES: ProductImage[] = [
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-stealth-01@2x.png',
    alt: 'horizon stealth ring slide 1',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-stealth-02@2x.png',
    alt: 'horizon stealth ring slide 2',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-stealth-03@2x.png',
    alt: 'horizon stealth ring slide 3',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/app_heartrate_4x3.png',
    alt: 'app showing heartrate',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/app_spo2_4x3.png',
    alt: 'app showing spo2',
  },
];

export default PRODUCT_IMAGES;
