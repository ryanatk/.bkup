import { CircularProgress } from '@material-ui/core';
import { useMyOrders } from '../../../queries/MyOrders';
import {
  BodyLink,
  Box,
  Footer,
  Header,
  MainContent,
  PageContainer,
  Typography,
} from '../../sormus';
import MyAccountTabs from './MyAccountTabs';

interface PageProps {
  authToken: string;
  children: React.ReactElement;
}

const MyAccountLoading = () => (
  <div className="text-center">
    <CircularProgress />
  </div>
);

const MyAccountWrapper = ({ authToken, children }: PageProps) => {
  const { data: myOrders = {}, isLoading } = useMyOrders(authToken);

  return (
    <div className="tailwind">
      <Header showCart={false} hideLinks={true} shopButton={false} />
      <MainContent>
        <PageContainer name="my-order-dashboard">
          <Box>
            <Typography variant="h3" Element="h1">
              My Account
            </Typography>

            {isLoading ? (
              <MyAccountLoading />
            ) : (
              <>
                <MyAccountTabs authToken={authToken} />
                {children}
              </>
            )}

            <Typography align="center" className="mt-28">
              Need help? Visit our{' '}
              <BodyLink
                href="https://support.ouraring.com/hc/en-us"
                target="_blank"
                color="helsinkiBlue"
              >
                Support Center
              </BodyLink>
            </Typography>
          </Box>
        </PageContainer>
      </MainContent>

      <div className="border-t border-grayscale">
        <Footer />
      </div>
    </div>
  );
};

export default MyAccountWrapper;
