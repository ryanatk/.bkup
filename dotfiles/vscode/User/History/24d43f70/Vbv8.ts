import { PDPData_content_productByHandle } from '../queries/types/PDPData';
import CartState from '../types/CartState';
import CheckoutState, {
  CheckoutAddress,
  CheckoutShippingRate,
} from '../types/CheckoutState';
import Product, { Price, ProductImage } from '../types/Product';
import State from '../types/State';

export enum EventType {
  ArticleLandingPage = 'article_landing_page',
  B2bModalOpened = 'b2b_email_signup_modal_opened',
  B2bModalCompleted = 'b2b_email_signup_completed',
  CarouselArrowClicked = 'Carousel Arrow Clicked',
  CarouselArrowsClicked = 'Carousel Arrows Clicked',
  CarouselScrolled = 'Carousel Scrolled',
  CartIconClicked = 'Cart Icon Clicked',
  CartViewed = 'cart_viewed',
  CheckoutNewStepCompleted = 'checkout_new_step_completed',
  CheckoutOrderCompleted = 'checkout_order_complete',
  CheckoutStarted = 'checkout_started',
  CheckoutStepCompleted = 'checkout_step_completed',
  CheckoutStepViewed = 'checkout_step_viewed',
  ContentCompleted = 'Content Completed',
  ContentPaused = 'Content Paused',
  ContentPlayed = 'Content Played',
  ContentViewed = 'Content Viewed',
  CTAClicked = 'CTA Clicked',
  EmailSignupCompleted = 'Email Signup Completed',
  ExperimentViewed = 'Experiment Viewed',
  GenerateLead = 'generate_lead',
  GiftBoxChecked = 'Gift Box Checked',
  GiftBoxUnchecked = 'Gift Box Un-Checked',
  ImageSwitched = 'image_switched',
  LinkClicked = 'link_clicked',
  ManualSizeSelected = 'manual_size_selected',
  ModalOpened = 'modal_opened',
  ModuleClicked = 'Module Clicked',
  ModuleHovered = 'Module Hovered',
  OptionClicked = 'option_clicked',
  ProcessNewConsent = 'processNewConsent',
  ProductAdded = 'product_to_cart',
  ProductClicked = 'product_clicked',
  ProductRemoved = 'product_to_remove_cart',
  ProductViewed = 'product_viewed',
  SizingKitSelected = 'sizing_kit_selected',
  CorrectedAddressDisplayed = 'corrected_address_shown',
  PlaceOrderButtonClicked = 'Place Order Button Clicked',
  SectionExpanded = 'section_expanded',
}

export enum GA4Name {
  AddPaymentInfo = 'add_payment_info',
  AddShippingInfo = 'add_shipping_info',
  AddToCart = 'add_to_cart',
  BeginCheckout = 'begin_checkout',
  Purchase = 'purchase',
  RemoveFromCart = 'remove_from_cart',
  ViewCart = 'view_cart',
  ViewItem = 'view_item',
}

export enum GTMName {
  GTMCheckout = 'checkout',
  GTMAddToCart = 'addToCart',
  GTMRemoveFromCart = 'removeFromCart',
}

export enum AnalyticsName {
  CartViewed = 'Cart Viewed',
  CheckoutStarted = 'Checkout Started',
  CheckoutStepCompleted = 'Checkout Step Completed',
  CheckoutStepViewed = 'Checkout Step Viewed',
  ManualSizeSelected = 'Manual Size Selected',
  OrderCompleted = 'Order Completed',
  PageViewed = 'Page View',
  ProductAdded = 'Product Added',
  ProductClicked = 'Product Clicked',
  ProductRemoved = 'Product Removed',
  ProductViewed = 'Product Viewed',
  ProductViewedSegment = 'Product Viewed Segment',
  SizingKitSelected = 'Sizing Kit Selected',
  UserEmailCaptured = 'User Email Captured',
  UserGiftOptionsCaptured = 'User Gift Options Captured',
  UserBillingAddressCaptured = 'User Billing Address Captured',
  UserShippingAddressCaptured = 'User Shipping Address Captured',
  PlaceOrderButtonClicked = 'User Clicked Place Order Button',
  CorrectedAddressDisplayed = 'Corrected Address Shown',
}

export const EventName = { ...GA4Name, ...GTMName, ...AnalyticsName };
export type EventName = GA4Name | GTMName | AnalyticsName;

export type PayloadItems = {
  action?: string;
  ambassadorName?: string;
  billing_address?: string | CheckoutAddress;
  carouselNumberInOrder?: number;
  carouselTitle?: string;
  cart?: CartState;
  contentDuration?: number;
  contentTitle?: string;
  contentType?: string;
  correctedAddress?: CheckoutAddress;
  cta?: string;
  email?: string;
  experiment_id?: string;
  experiment_name?: string;
  handle?: Product['handle'];
  hasGiftMessage?: boolean;
  images?: ProductImage[];
  id?: CheckoutShippingRate['id'];
  location?: string;
  module?: string;
  originalAddress?: CheckoutAddress;
  path?: string;
  payment_method?: string | null;
  price?: Price;
  product?: PDPData_content_productByHandle;
  ringType?: string;
  shipping_address?: Address;
  step?: number;
  timeElapsed?: number;
  title?: string;
  variant_id?: string;
  variant_name?: string;
  variants?: Product['variants'];
  checkout?: CheckoutState;
};

export interface Payload {
  payload: PayloadItems;
  type: EventType;
}

export enum Integrations {
  GA4 = 'gA4',
  GoogleTagManager = 'googleTagManager',
  Segment = 'segment',
}

export type Mappings = {
  [Integrations.GA4]: (state: State) => {
    event: (payload: Payload) => void;
  };
  [Integrations.GoogleTagManager]: (state: State) => {
    event: (payload: Payload) => void;
  };
  [Integrations.Segment]: (state: State) => {
    event: (payload: Payload) => void;
  };
};

export interface BaseDataLayer {
  event: EventName | EventType;
}

export type Address = {
  address: string;
  address2: string;
  city: string;
  country: string;
  email: string;
  fname: string;
  lname: string;
  phone: string;
  postal: string;
  state: string;
};

export type BaseProductType = {
  brand: string;
  category: string;
  coupon: string;
  image_url: string;
  name: string;
  position: number;
  price: number;
  product_id: string | number;
  quantity: number;
  sku: string;
  url: string;
  variant: string | number;
  currency: string;
  fbc: string | null;
  fbp: string | null;
};

export type SegmentProductAddType = {
  cart_id: string | false;
};

export type SegmentProductPayloadType =
  | BaseProductType
  | (BaseProductType & SegmentCartViewType);

export type SegmentCartViewType = {
  cart_id: string | false;
  products: BuildCartLineItems[];
};

export type SegmentCheckoutStartType = {
  affiliation: string;
  coupon: string;
  currency: string;
  discount: number;
  order_id: string;
  revenue: number;
  shipping: number;
  tax: number;
  value: number;
  products: BuildCartLineItems[];
  fbc: string | null;
  fbp: string | null;
};

export type BaseSegmentPayloadType = {
  checkout_id: string;
  step: number;
};

export type ShippingMethodType = {
  shipping_method: string;
};

export type PaymentMethodType = {
  payment_method: string | null;
};

export type ShippingAddressType = {
  shipping_address: Address;
};

export type BillingAddressType = {
  billing_address: Address;
};

export type CheckoutStepCompleted =
  | (ShippingMethodType & PaymentMethodType)
  | (ShippingMethodType & BillingAddressType)
  | (ShippingMethodType & ShippingAddressType);

export type CheckoutOrderCompletedType = {
  checkout_id: string;
  order_id: string;
  external_id: string;
  affiliation: string;
  total: number;
  subtotal: number;
  revenue: number;
  shipping: number;
  tax: number;
  discount: number;
  coupon: string;
  currency: string;
  products: BuildCartLineItems[];
  email: string;
  address: Address;
  url: string;
  cpclid: string;
  cppid: string;
  fbc: string | null;
  fbp: string | null;
  isGift: boolean;
  giftDelivery: boolean;
  isGiftMessage: boolean;
  gateway: string;
  affirmPaymentToken?: string;
  checkoutSessionId?: string;
};

export type SegmentPayloadType =
  | (BaseSegmentPayloadType & CheckoutStepCompleted)
  | CheckoutOrderCompletedType;

export interface BuildCartLineItems {
  product_id: string;
  sku: string;
  name: string;
  price: number;
  position: number;
  quantity: number;
  category: string;
  url: string;
  image_url: string;
}

export interface BuildAnalyticsCartItems {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category: string;
  coupon: string;
  currency: string;
  discount: number;
  item_variant: string;
  item_brand: string;
}

export type ItemsType = {
  coupon: string | null;
  currency: string;
  discount: number;
  item_brand: string;
  item_category: string;
  item_id: string;
  item_name: string;
  item_variant: string;
  price: number;
  quantity: number;
};

export type BaseGA4Type = {
  items: ItemsType[];
};

export type GA4CartViewType = {
  currency: string;
  value: number;
};

export type GA4OrderCompleteType = {
  coupon: string;
  payment_type: string;
};

export type GA4OrderType = {
  affiliation: string;
  coupon: string;
  currency: string;
  tax: number;
  transaction_id: number;
  value: number;
};

export type GA4CheckoutStepType = {
  currency: string;
  value: number;
  coupon: string;
  shipping_tier: string;
};

export type GA4PayloadType =
  | BaseGA4Type
  | (BaseGA4Type & GA4CartViewType)
  | (BaseGA4Type & GA4CartViewType & GA4OrderCompleteType)
  | (BaseGA4Type & GA4OrderType)
  | (BaseGA4Type & GA4CheckoutStepType);

export type GTMProductCheckoutType = {
  product_id: string;
  position: number;
  sku: string;
  image_url: string;
  url: string;
  quantity: number;
};

export type GTMCartItemsType = {
  name: string;
  product_id: string;
  price: number;
  position: number;
  sku: string;
  image_url: string;
  category: string;
  url: string;
  quantity: number;
};

export type GTMProductType = {
  name: string;
  id: number;
  price: number;
  brand: string;
  category: string;
  variant: string | number;
};

export type GTMProductPayloadType =
  | GTMProductType
  | GTMCartItemsType
  | (GTMProductType & GTMProductCheckoutType);
