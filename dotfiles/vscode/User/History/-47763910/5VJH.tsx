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
import { t } from '../../public/locales/LocaleContext';

const { seoParams } = contactSEO;

const Page = () => {
  return (
    <div className="tailwind">
      <NextSeo {...seoParams} />
      <Header />
      <div className="bg-helsinkiBlue">
        <Box paddingY={6}>
          <Typography variant="h2" Element="h1" color="white">
            {t('contact_title')}
            Let's keep in touch.
          </Typography>
        </Box>
      </div>
      <PageContainer name="contact">
        <Grid>
          <div className="col-main lg:col-end-8">
            <Typography variant="h3" Element="h2">
              {t('contact_section_1_heading')}
              Contact Us
            </Typography>
          </div>
          <div className="col-main lg:col-start-8">
            <div className="mb-8">
              <Typography variant="h5" Element="h3">
                {t('contact_customer_support_title')}
                Customer Support
              </Typography>
              <Typography>
                {t('contact_customer_support_body', {
                  a(chunks: string[]) {
                    return (
                      <BodyLink
                        href="https://help.ouraring.com"
                        target="_blank"
                      >
                        {chunks}
                      </BodyLink>
                    );
                  },
                })}
                For customer support, please{' '}
                <BodyLink href="https://help.ouraring.com" target="_blank">
                  visit our Help Center
                </BodyLink>
                .
              </Typography>
            </div>
            <Typography variant="h5" Element="h3">
              {t('contact_brand_partnership_title')}
              Brand Partnership Inquiries
            </Typography>
            <Typography>
              {t('contact_brand_partnership_body', {
                a(chunks: string[]) {
                  return (
                    <BodyLink href="mailto:brandpartnerships@ouraring.com">
                      {chunks}
                    </BodyLink>
                  );
                },
              })}
              Please{' '}
              <BodyLink href="mailto:brandpartnerships@ouraring.com">
                submit a request
              </BodyLink>
              .
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-end-8 lg:pt-8">
            <Typography variant="h3" Element="h2">
              {t('contact_section_2_heading')}
              Location Information
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-start-8 lg:pt-8">
            <Typography variant="h5" className="mb-8">
              {t('contact_location_info')}
              Oura Health Ltd.'s HQ is located in Oulu, Finland.
            </Typography>

            <div className="mb-8">
              <Typography>
                {t('contact_location_address', {
                  br: <br />,
                })}
              </Typography>
              <Typography>Elektroniikkatie 10</Typography>
              <Typography>Oulu, Finland</Typography>
            </div>

            <Typography>
              {t('contact_location_other', {
                br: <br />,
              })}
            </Typography>
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
