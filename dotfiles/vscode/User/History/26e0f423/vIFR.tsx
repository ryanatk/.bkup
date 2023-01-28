import Link from 'next/link';
import {
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
} from '../../components/sormus';

const Page = () => {
  return (
    <div className="tailwind">
      <Header bordered />
      <PageContainer name="privacy-policy">
        <Box className="max-w-3xl">
          <Typography Element="h1" variant="h3">
            Privacy Policies
          </Typography>
          <Typography variant="h6" className="mb-8">
            On this page you can access the Oura Health Privacy Policies:
          </Typography>
          <Typography className="mb-4 underline">
            <Link href="/privacy-policy-oura-health" passHref>
              <a>Oura Health Privacy Policy</a>
            </Link>
          </Typography>
          <Typography className="underline">
            <Link
              href="https://cloud.ouraring.com/legal/teams/privacy-policy"
              target="_blank"
              passHref
            >
              <a>Oura Teams Privacy Policy</a>
            </Link>
          </Typography>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.isSormusCompatible = true;
Page.pageName = 'Privacy Policy';
export default Page;
