import { MessageKey } from '../../../../public/locales/setup';

export interface ProductFeatureSlideshowItem {
  feature: {
    src: {
      mobile: string;
      desktop: string;
    };
    alt: MessageKey;
  };
  swatch: {
    name: MessageKey;
    src: string;
  };
}

const productFeatureSlideshowData: ProductFeatureSlideshowItem[] = [
  {
    feature: {
      src: {
        mobile: 'simple-home/m-home-color-picker-img-01@2x',
        desktop: 'simple-home/d-home-color-picker-img-01@2x',
      },
      alt: 'simple_home_product_image_1_alt',
    },
    swatch: {
      name: 'pdp_ring_color_silver_label',
      src: 'product/pdp-swatch-horizon-silver@2x',
    },
  },
  {
    feature: {
      src: {
        mobile: 'simple-home/m-home-color-picker-img-02@2x',
        desktop: 'simple-home/d-home-color-picker-img-02@2x',
      },
      alt: 'simple_home_product_image_2_alt',
    },
    swatch: {
      name: 'pdp_ring_color_black_title',
      src: 'product/pdp-swatch-horizon-black@2x',
    },
  },
  {
    feature: {
      src: {
        mobile: 'simple-home/m-home-color-picker-img-03@2x',
        desktop: 'simple-home/d-home-color-picker-img-03@2x',
      },
      alt: 'simple_home_product_image_3_alt',
    },
    swatch: {
      name: 'pdp_ring_color_stealth_title',
      src: 'product/pdp-swatch-horizon-stealth@2x',
    },
  },
  {
    feature: {
      src: {
        mobile: 'simple-home/m-home-color-picker-img-04@2x',
        desktop: 'simple-home/d-home-color-picker-img-04@2x',
      },
      alt: 'simple_home_product_image_4_alt',
    },
    swatch: {
      name: 'pdp_ring_color_gold_title',
      src: 'product/pdp-swatch-horizon-gold@2x',
    },
  },
  {
    feature: {
      src: {
        mobile: 'simple-home/m-home-color-picker-img-05@2x',
        desktop: 'simple-home/d-home-color-picker-img-05@2x',
      },
      alt: 'simple_home_product_image_5_alt',
    },
    swatch: {
      name: 'pdp_ring_color_rose_gold_title',
      src: 'product/pdp-swatch-horizon-rose@2x',
    },
  },
];

export default productFeatureSlideshowData;
