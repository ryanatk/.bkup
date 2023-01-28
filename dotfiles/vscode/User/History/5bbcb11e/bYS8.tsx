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
              Accessibility
            </Typography>

            <Typography>
              {t('accessibility_body_1', {
                ouraringDotCom: (
                  <BodyLink href="https://ouraring.com" color="inherit">
                    {t('ouraringDotCom')}
                  </BodyLink>
                ),
              })}
            </Typography>

            <Typography>
              We are currently and continuously working on implementing
              technological improvements to enhance the accessibility on our
              website and mobile site. As we continue to work towards this goal
              we welcome any feedback that you may have for us. Please feel free
              to{' '}
              <BodyLink
                href="https://support.ouraring.com/hc/en-us/requests/new"
                color="inherit"
                target="_blank"
              >
                contact us
              </BodyLink>
              .
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
