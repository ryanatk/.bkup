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
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01-heritage@2x.png',
    alt: 'heritage silver ring slide 1',
  },
];

export default SLIDESHOW_IMAGES;
