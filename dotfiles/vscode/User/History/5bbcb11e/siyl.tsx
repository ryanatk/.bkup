import { NextSeo } from 'next-seo';
import {
  BodyLink,
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../components/sormus';
import { accessibility } from '../../data-mock/page-details/accessibility';
import { t, useLocale } from '../../public/locales/LocaleContext';

const Page = () => {
  const { selectedLocale } = useLocale();

  return (
    <div className="tailwind">
      <NextSeo {...accessibility.seoParams} />
      <Header bordered />
      <PageContainer name="accessibility">
        <Box className="max-w-3xl">
          <TypographyRhythm>
            <Typography variant="h1" Element="h1">
              {t('accessibility_title')}
            </Typography>

            <Typography>
              {t('accessibility_body_1', {
                ouraringDotCom: (
                  <BodyLink href="https://ouraring.com" color="inherit">
                    {/* href={`https://ouraring.com/${selectedLocale}`} */}
                    ouraring.com
                  </BodyLink>
                ),
              })}
            </Typography>

            <Typography>
              {t('accessibility_body_2', {
                contactUs: (
                  <BodyLink
                    href={`https://support.ouraring.com/hc/${selectedLocale}/requests/new`}
                    color="inherit"
                    target="_blank"
                  >
                    {t('accessibility_contact_us')}
                  </BodyLink>
                ),
              })}
            </Typography>
          </TypographyRhythm>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.isSormusCompatible = true;
Page.pageName = 'Accessibility';
export default Page;
