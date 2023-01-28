/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Countries
// ====================================================

export interface Countries_content_countries_shippingRate {
  __typename: 'ShippingRate';
  description: string | null;
  price: number | null;
}

export interface Countries_content_countries_regions {
  __typename: 'CountryRegions';
  label: string | null;
  value: string | null;
}

export interface Countries_content_countries_merchant {
  __typename: 'CountryMerchant';
  prod: string | null;
  staging: string | null;
}

export interface Countries_content_countries {
  __typename: 'Country';
  currency: string | null;
  status: boolean | null;
  membershipStatus?: boolean | null;
  countryCode: string | null;
  shippingRate: Countries_content_countries_shippingRate | null;
  eu: boolean | null;
  name: string | null;
  regions: (Countries_content_countries_regions | null)[] | null;
  merchant: Countries_content_countries_merchant | null;
  disallowedProductSkus: (string | null)[] | null;
}

export interface Countries_content {
  __typename: 'ContentFilter';
  countries: (Countries_content_countries | null)[] | null;
}

export interface Countries {
  content: Countries_content | null;
}
