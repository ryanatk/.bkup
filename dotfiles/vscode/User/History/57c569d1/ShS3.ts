const GEN = {
  HORIZON: 'Horizon',
  HERITAGE: 'Heritage',
};

export interface ProductImage {
  gen: string;
  originalSrc: string;
  alt: string | null;
}

const SLIDESHOW_IMAGES: ProductImage[] = [
  {
    gen: GEN.HORIZON,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01@2x.png',
    alt: 'horizon silver ring slide 1',
  },
  {
    gen: GEN.HORIZON,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-black-01@2x.png',
    alt: 'horizon black ring slide 1',
  },
  {
    gen: GEN.HORIZON,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-stealth-01@2x.png',
    alt: 'horizon stealth ring slide 1',
  },
  {
    gen: GEN.HORIZON,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-gold-01@2x.png',
    alt: 'horizon gold ring slide 1',
  },
  {
    gen: GEN.HORIZON,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-rose-01@2x.png',
    alt: 'horizon rose ring slide 1',
  },
  {
    gen: GEN.HERITAGE,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01-heritage@2x.png',
    alt: 'heritage silver ring slide 1',
  },
  {
    gen: GEN.HERITAGE,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-black-01-heritage@2x.png',
    alt: 'heritage black ring slide 1',
  },
  {
    gen: GEN.HERITAGE,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-stealth-01-heritage@2x.png',
    alt: 'heritage stealth ring slide 1',
  },
  {
    gen: GEN.HERITAGE,
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-gold-01-heritage@2x.png',
    alt: 'heritage gold ring slide 1',
  },
];

export default SLIDESHOW_IMAGES;
