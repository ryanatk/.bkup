import { NextSeo } from 'next-seo';
import {
  BodyLink,
  Box,
  Footer,
  Grid,
  Header,
  PageContainer,
  Typography,
} from '../../components/sormus';
import contactSEO from '../../data-mock/page-details/contact';

const { seoParams } = contactSEO;

const Page = () => {
  return (
    <div className="tailwind">
      <NextSeo {...seoParams} />
      <Header />
      <div className="bg-helsinkiBlue">
        <Box paddingY={6}>
          <Typography variant="h2" Element="h1" color="white">
            Let's keep in touch.
          </Typography>
        </Box>
      </div>
      <PageContainer name="contact">
        <Grid>
          <div className="col-main lg:col-end-8">
            <Typography variant="h3" Element="h2">
              Contact Us
            </Typography>
          </div>
          <div className="col-main lg:col-start-8">
            <div className="mb-8">
              <Typography variant="h5" Element="h3">
                Customer Support
              </Typography>
              <Typography>
                For customer support, please{' '}
                <BodyLink href="https://help.ouraring.com" target="_blank">
                  visit our Help Center
                </BodyLink>
                .
              </Typography>
            </div>
            <Typography variant="h5" Element="h3">
              Media, research, or partnership inquiries
            </Typography>
            <Typography>
              Please{' '}
              <BodyLink
                href="https://s.ouraring.com/oura-partners-contact"
                target="_blank"
              >
                submit a request
              </BodyLink>
              .
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-end-8 lg:pt-8">
            <Typography variant="h3" Element="h2">
              Location Information
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-start-8 lg:pt-8">
            <Typography variant="h5" className="mb-8">
              Oura Health Ltd.'s HQ is located in Oulu, Finland.
            </Typography>

            <div className="mb-8">
              <Typography>Elektroniikkatie 10</Typography>
              <Typography>Oulu, Finland</Typography>
            </div>

            <Typography>Other locations include:</Typography>
            <Typography>Helsinki and San Francisco.</Typography>
          </div>
        </Grid>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.pageName = 'Contact';
Page.isSormusCompatible = true;

export default Page;