import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Routes } from 'routes';
import { getTheme } from 'themes';
import {
  AuthProvider,
  CustomerProvider,
  OrdersProvider,
  ShopProvider,
} from 'app/context';
import { Styles } from 'app/styles';
import { ENV } from 'common/const';
import { getSiteOwnership, getSiteProps } from 'common/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = getTheme();

console.info('[App]', ENV);
console.info('[Site]', {
  owner: getSiteOwnership(),
  props: getSiteProps(),
});

const App = () => (
  // Theme & Styles
  <Styles theme={theme}>
    {/* React Query */}
    <QueryClientProvider client={queryClient}>
      {/* App Context */}
      <AuthProvider>
        <CustomerProvider>
          <ShopProvider>
            {/* TODO: move this to only wrap orders routes */}
            <OrdersProvider>
              {/* Routes & Links */}
              <Routes />
            </OrdersProvider>
          </ShopProvider>
        </CustomerProvider>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </Styles>
);

export default App;
