export interface ProductImage {
  originalSrc: string;
  alt: string | null;
}

const GEN = {
  HORIZON: 'Horizon',
  HERITAGE: 'Heritage',
};

const SLIDESHOW_IMAGES: ProductImage[] = [
  {
    originalSrc:
      'https://s3.amazonaws.com/ouraring.com/images/product/simple/pdp-img-carousel-silver-01-heritage@2x.png',
    alt: 'heritage silver ring slide 1',
  },
];

export default SLIDESHOW_IMAGES;
