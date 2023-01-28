import request, { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import queryClient from '../helpers/queryClient';
import { GraphQLEndpoint } from '../utils/backendAPI';
import { Countries, Countries_content_countries } from './types/Countries';

export const query = gql`
  query Countries {
    content {
      countries {
        currency
        status
        countryCode
        shippingRate {
          description
          price
        }
        eu
        name
        regions {
          label
          value
        }
        merchant {
          prod
          staging
        }
        disallowedProductSkus
      }
    }
  }
`;

function withQueryKey() {
  return {
    key: ['Countries'],
    fetch: async () => {
      const data: Countries = await request(GraphQLEndpoint, query, {});
      return data.content.countries;
    },
  };
}

export function useSellToCountriesList({
  isMembership,
  showAll,
}: {
  isMembership: boolean;
  showAll: boolean;
}): {
  isLoading: boolean;
  data: Countries_content_countries[];
} {
  const { key, fetch } = withQueryKey();
  const { data, isLoading } = useQuery(key, fetch);
  const filterFn = ({ status, membershipStatus }) => {
    if (showAll) {
      return true;
    }
    if (isMembership) {
      return membershipStatus ?? status;
    }
    return status;
  };

  return {
    isLoading,
    data: data ? data.filter(filterFn) : undefined,
  };
}

export async function getSellToCountry(
  countryCode: string,
): Promise<Countries_content_countries> {
  const { key, fetch } = withQueryKey();
  const countryData = await queryClient.fetchQuery(key, fetch);
  return countryData.find((country) => country.countryCode === countryCode);
}
