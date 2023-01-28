import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
} from '../../components/sormus';
import { privacyPolicy } from '../../data-mock/page-details/privacy-policy';
import { t, useLocale } from '../../public/locales/LocaleContext';

const Page = () => {
  const { selectedLocale } = useLocale();

  return (
    <div className="tailwind">
      <NextSeo {...privacyPolicy.seoParams} />
      <Header bordered />
      <PageContainer name="privacy-policy">
        <Box className="max-w-3xl">
          <Typography Element="h1" variant="h3">
            {t('privacy_policy_title')}
          </Typography>
          <Typography variant="h6" className="mb-8">
            {t('privacy_policy_heading')}:
          </Typography>
          <Typography className="mb-4 underline">
            <Link
              href={`/${selectedLocale}/privacy-policy-oura-health`}
              passHref
            >
              <a>{t('privacy_policy_health_link')}</a>
            </Link>
          </Typography>
          <Typography className="underline">
            <Link
              href="https://cloud.ouraring.com/legal/teams/privacy-policy"
              passHref
            >
              <a target="_blank">{t('privacy_policy_teams_link')}</a>
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
