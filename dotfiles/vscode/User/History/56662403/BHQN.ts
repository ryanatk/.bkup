import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';
import queryClient from '../helpers/queryClient';
import useCurrency from '../helpers/useCurrency';
import { GraphQLEndpoint } from '../utils/backendAPI';
import { normalizeRegionCode } from '../utils/localeUtils';
import { PDPDataVariables } from './types/PDPData';
export type { PDPData, PDPDataVariables } from './types/PDPData';

export const query = gql`
  query PDPData(
    $region: String
    $currency: String
    $productHandle: String!
    $flags: [String]
  ) {
    content(region: $region, currency: $currency, enabledFeatureFlags: $flags) {
      rings: collection(collectionKey: "rings") {
        _traits: traits {
          name
        }

        products {
          handle
          _selectedTraits: selectedTraits {
            name
            value
          }
        }
      }

      productByHandle(handle: $productHandle) {
        id
        handle
        title
        inStock
        price {
          amount
          currencyCode
        }
        comparePrice {
          amount
          currencyCode
        }
        _isRing: isRing
        seoParams {
          title
          description
        }
        options {
          name
          value
        }
        images {
          originalSrc
          alt
        }
        variants {
          sku
          skuCode
          id: variantId
          variantId
          productId
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

function withQueryKey(vars: PDPDataVariables) {
  return {
    key: ['usePDPData', vars.region, vars.productHandle, vars.currency].concat(
      vars.flags,
    ),
    fetch: async () => {
      const data = await request(GraphQLEndpoint, query, vars);

      // Fix the returned data. The existing code expects IDs to be very large numbers.
      // These numbers aren't supported natively by GraphQL because they're too big to
      // be ints, so convert them here.

      const product = data.content.productByHandle;

      if (product) {
        product.id = Number(product.id);

        for (const variant of product.variants) {
          variant.id = Number(variant.id);
          variant.productId = Number(variant.productId);
        }
      }

      return data;
    },
  };
}

export function fetchPDPData({
  region,
  productHandle,
  currency,
}: PDPDataVariables) {
  region = normalizeRegionCode(region);
  const { key, fetch } = withQueryKey({
    region,
    productHandle,
    currency,
    flags: [],
  });
  return queryClient.fetchQuery(key, fetch);
}

export function usePDPData({ productHandle }: { productHandle: string }) {
  const currency = useCurrency();
  const { key, fetch } = withQueryKey({
    currency: currency.currencyCode,
    productHandle,
  });
  return useQuery(key, fetch);
}
