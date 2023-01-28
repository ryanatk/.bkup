interface Image {
  originalSrc: string;
  alt: string | null;
}

const PRODUCT_IMAGES: Image[] = [
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
];

export default PRODUCT_IMAGES;
