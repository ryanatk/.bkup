import { CircularProgress } from '@material-ui/core';
import { Footnote, MY_ACCOUNT_FOOTNOTE } from '../../../consts/legal-footnotes';
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
import LegalFootnotes from '../_global/LegalFootnotes';
import MyAccountTabs from './MyAccountTabs';

interface PageProps {
  authToken: string;
  hasMembership?: boolean;
  children: React.ReactElement;
}

const useFootnotes = (): Footnote[] => {
  return [MY_ACCOUNT_FOOTNOTE];
};

const MyAccountLoading = () => (
  <div className="text-center">
    <CircularProgress />
  </div>
);

const MyAccountWrapper = ({
  authToken,
  hasMembership = false,
  children,
}: PageProps): JSX.Element => {
  const { data: myOrders = {}, isLoading } = useMyOrders(authToken);
  const footnotes = useFootnotes();

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

      {hasMembership && <LegalFootnotes footnotes={footnotes} />}
      <Footer />
    </div>
  );
};

export default MyAccountWrapper;