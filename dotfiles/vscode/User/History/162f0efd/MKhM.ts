export interface ProductImage {
  originalSrc: string;
  alt: string | null;
}

const SLIDESHOW_IMAGES: ProductImage[] = [
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01-heritage@2x.png',
    alt: 'heritage silver ring slide 1',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/horizon-rings.png',
    alt: 'horizon: silver, black, stealth, gold, rose gold',
  },
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/fsa-hsa-info/heritage-rings.png',
    alt: 'heritage: silver, black, stealth, gold',
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

export default SLIDESHOW_IMAGES;
