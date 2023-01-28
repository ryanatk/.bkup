import { Products_content_listProducts } from '../queries/types/Products';
import { ProductImage } from './Product';

export interface Discount {
  code: string;
  value?: number;
}

export interface CartLineItem {
  title: string;
  id: string;
  available: boolean;
  unitPrice: number;
  price: number;
  totalDiscountPrice: number;
  productId: number;
  sku: string;
  product: Products_content_listProducts;
  image: ProductImage[];
  selectedOptions: {
    id: any;
    name: string;
    value: string;
  }[];
  quantity: number;
  discounts: false | Discount;
  parentId: string;
}

export default interface CartState {
  isLoading: boolean;
  currency: any;
  totalPrice: number;
  totalDiscount: number;
  totalPriceAfterDiscount: number;
  totalCount: number;
  lineItems: CartLineItem[];
  error?: false;
  discounts: Discount[];
  // @TODO: Address this 'any' in follow up PR
  cartDiscount: false | number | any;
  cartId: false | string;
  updateVersion: number;
  graphql?: boolean;
  bilbo?: boolean;
}
