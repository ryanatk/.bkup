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
import { t, useLocale } from '../../public/locales/LocaleContext';

const { seoParams } = contactSEO;

const Page = () => {
  const { selectedLocale } = useLocale();

  return (
    <div className="tailwind">
      <NextSeo {...seoParams} />
      <Header />
      <div className="bg-helsinkiBlue">
        <Box paddingY={6}>
          <Typography variant="h2" Element="h1" color="white">
            {t('contact_title')}
          </Typography>
        </Box>
      </div>
      <PageContainer name="contact">
        <Grid>
          <div className="col-main lg:col-end-8">
            <Typography variant="h3" Element="h2">
              {t('contact_section_1_heading')}
            </Typography>
          </div>

          <div className="col-main lg:col-start-8">
            <div className="mb-8">
              <Typography variant="h5" Element="h3">
                {t('contact_customer_support_title')}
              </Typography>

              <Typography>
                {t('contact_customer_support_body', {
                  a(chunks: string[]) {
                    return (
                      <BodyLink
                        href={`https://help.ouraring.com/hc/${selectedLocale}`}
                        target="_blank"
                      >
                        {chunks}
                      </BodyLink>
                    );
                  },
                })}
              </Typography>
            </div>

            <Typography variant="h5" Element="h3">
              {t('contact_brand_partnership_title')}
            </Typography>

            <Typography>
              {t('contact_brand_partnership_body', {
                a(chunks: string[]) {
                  return (
                    <BodyLink
                      href="mailto:brandpartnerships@ouraring.com"
                      target="_blank"
                    >
                      {chunks}
                    </BodyLink>
                  );
                },
              })}
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-end-8 lg:pt-8">
            <Typography variant="h3" Element="h2">
              {t('contact_section_2_heading')}
            </Typography>
          </div>

          <div className="col-main lg:row-start-2 lg:col-start-8 lg:pt-8">
            <Typography variant="h5" className="mb-8">
              {t('contact_location_info')}
            </Typography>

            <div className="mb-8">
              <Typography>
                {t('contact_location_address', {
                  br: <br />,
                })}
              </Typography>
            </div>

            <Typography>
              {t('contact_location_other', {
                br: <br />,
              })}
            </Typography>
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
