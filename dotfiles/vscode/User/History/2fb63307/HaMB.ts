export interface ProductImage {
  originalSrc: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  available: boolean;
  id: number;
  price: number;
  productId: number;
  sku: string;
  unitPrice: number;
  image: ProductImage;
  selectedOptions: any;
}

export interface Price {
  amount: number;
  currencyCode: string;
}

export default interface Product {
  seoParams?: {
    title: string;
    description: string;
  };

  // seoParamsLok - only used for product json files, not used for GraphQL data.
  seoParamsLok?: {
    title: string;
    description: string;
  };

  _isRing?: boolean;
  id?: number | string;
  handle?: string;
  title?: string;

  variants?: {
    id: number;
    productId: number;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    sku: string;
  }[];

  images?: ProductImage[];

  price?: Price;
  comparePrice?: Price;

  checkoutDescription?: string;
}
