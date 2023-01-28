import { css } from '@emotion/react';
import { IconButton, makeStyles } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  BodyLink,
  Box,
  DeprecatedButton,
  Footer,
  Grid,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
  Video,
} from '../../components/sormus';
import { breakpoints } from '../../components/sormus/constants';
import Modal from '../../components/sormus/Modal';
import { sizing } from '../../data-mock/page-details/sizing';
import useMediaQuery from '../../hooks/useMediaQuery';
import { t } from '../../public/locales/LocaleContext';
import { backgroundCover, backgroundImage } from '../../utils/imageHelpers';

const useClasses = makeStyles((theme) => ({
  button: {
    background: 'white',
    '&:hover': {
      background: '#FC6558',
      color: 'white',
    },
  },
}));

const Page = () => {
  const { button } = useClasses();
  const [videoOpen, setVideoOpen] = useState(false);
  const isLarge = () => useMediaQuery(`min-width:${breakpoints.medium}px)`);
  const handlePlayVideo = () => {
    setVideoOpen(true);
  };
  const handleCloseModal = () => setVideoOpen(false);
  const router = useRouter();

  return (
    <div className="tailwind">
      <NextSeo {...sizing.seoParams} />
      <Header />
      <div
        className={`bg-helsinkiBlue pt-32 min-h-96 pb-96 lg:pt-48 lg:pb-96`}
        css={css`
          ${{
            ...backgroundImage(
              isLarge ? 'sizing/sizing_desktop' : 'sizing/sizing_mobile',
              isLarge ? 1600 : 400,
              'jpg',
            ),
            ...backgroundCover,
          }}
        `}
      >
        <Box>
          <div className="max-w-sm lg:max-w-xl pb-36">
            <Typography variant="h2" Element="h1" color="white">
              {t('sizing_title')}
            </Typography>
            <div className="flex items-center mt-8">
              <IconButton
                aria-label="Watch the video"
                className={button}
                onClick={handlePlayVideo}
              >
                <PlayArrow />
              </IconButton>
              <Typography
                className="pl-4 cursor-pointer"
                onClick={handlePlayVideo}
                variant="h6"
                color="white"
              >
                {t('watch_the_video')}
              </Typography>
            </div>
          </div>
        </Box>
      </div>
      <Modal open={videoOpen} onClose={handleCloseModal} maxWidth="lg">
        <Video
          src="https://s3.amazonaws.com/ouraring.com/video/sizing/sizing_video.mp4"
          type="video/mp4"
          contentTitle="sizing_video"
          location="sizing_page"
          playVideo={videoOpen}
        />
      </Modal>

      <PageContainer name="sizing">
        <Grid>
          <div className="col-main lg:col-end-6">
            <Typography variant="h3" Element="h2">
              {t('sizing_confirm_size')}
            </Typography>
          </div>
          <div className="col-main lg:col-start-8">
            <Typography variant="h6" className="max-w-lg">
              {t('sizing_my_account_link')}
            </Typography>
            <DeprecatedButton
              variant="filled"
              className="mt-12"
              text={t('confirm_your_size')}
              onClick={() => router.push('/my-account')}
            />
          </div>
        </Grid>

        <Grid className="mt-24">
          <div className="col-main lg:col-end-6">
            <Typography variant="h3" Element="h2">
              {t('sizing_tips')}
            </Typography>
          </div>
          <div className="col-main lg:col-start-8">
            <TypographyRhythm>
              <Typography variant="h3">
                1. {t('sizing_choose_finger_title')}
              </Typography>
              <Typography variant="h6">
                {t('sizing_choose_finger_text')}
              </Typography>
              <Typography variant="h3" className="mt-12">
                2. {t('sizing_comfortable_fit_title')}
              </Typography>
              <Typography variant="h6">
                {t('sizing_comfortable_fit_text')}
              </Typography>
              <Typography variant="h3" className="mt-12">
                3. {t('sizing_test_fit_title')}
              </Typography>
              <Typography variant="h6">{t('sizing_test_fit_text')}</Typography>
              <Typography variant="h3" className="mt-12">
                4. {t('sizing_evaluate_fit_title')}
              </Typography>
              <Typography variant="h6">
                {t('sizing_evaluate_fit_text')}
              </Typography>
            </TypographyRhythm>
          </div>
        </Grid>

        <Grid className="mt-24">
          <div className="col-main lg:col-end-6">
            <Typography variant="h3" Element="h2">
              {t('sizing_in_store_now')}
            </Typography>
          </div>

          <div className="col-main lg:col-start-8">
            <Typography variant="h6" className="max-w-lg">
              {t('sizing_therabody_store')}{' '}
              <BodyLink
                href="https://www.therabody.com/us/en-us/stores"
                target="_blank"
              >
                {t('sizing_therabody_store_locator')}
              </BodyLink>
              .
            </Typography>
          </div>
        </Grid>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.pageName = 'Sizing';
Page.isSormusCompatible = true;
export default Page;
