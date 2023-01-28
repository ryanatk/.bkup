import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { src, srcSet } from '../../../../utils/imageHelpers';
import { Grid, Typography } from '../../../sormus';
import styles from './BilboRespondsToYou.module.scss';

interface BilboRespondsToYouProps {
  setDynamicPageClasses?: (classes: string) => void;
}

interface FeaturedSectionProps {
  imageAlt: string;
  imageSrc: string;
  uiImageAlt: string;
  uiImageSrc: string;
  title: MessageKey;
  children: React.ReactNode;
  reverse?: boolean;
}

const FeaturedSection = ({
  children,
  imageAlt,
  imageSrc,
  uiImageAlt,
  uiImageSrc,
  title,
  reverse = false,
}: FeaturedSectionProps) => {
  return (
    <Grid>
      <div
        className={reverse ? styles.FeaturedImageReverse : styles.FeaturedImage}
      >
        <img
          className={styles.uiImage}
          src={uiImageSrc}
          alt={uiImageAlt}
          loading="lazy"
          width="200"
        />
        <img src={imageSrc} alt={imageAlt} loading="lazy" />
      </div>
      <div
        className={
          reverse ? styles.FeaturedContentReverse : styles.FeaturedContent
        }
      >
        <Typography variant="h6" Element="h3" className="mb-4" weight="normal">
          {t(title)}
        </Typography>
        {children}
      </div>
    </Grid>
  );
};

const BilboRespondsToYou = ({
  setDynamicPageClasses = () => '',
}: BilboRespondsToYouProps) => {
  const localeForImage = useLocaleForImage();
  return (
    <>
      <Waypoint
        scrollableAncestor={window}
        bottomOffset="20%"
        topOffset="60%"
        onEnter={() => setDynamicPageClasses('bg-goldenHour text-helsinkiBlue')}
      >
        <div>
          <Grid>
            <div className="col-main md:col-start-2 md:col-end-10 lg:col-start-3 xl:col-end-10">
              <Typography Element="h2" variant="h1" className="mb-6">
                {t('responds_to_you_title')}
              </Typography>
            </div>
            <div className="col-main md:col-start-8 lg:col-end-13">
              <Typography variant="h4">
                {t('responds_to_you_description')}
              </Typography>
            </div>
          </Grid>
          <div className="flex flex-col gap-24 mt-24 lg:mt-20">
            <div>
              <FeaturedSection
                title={'reponds_to_you_aad_title'}
                imageSrc={srcSet('homepage/aad_gardening', 'jpg', [500]).srcSet}
                imageAlt="Oura automatic activity detection, AAD, measuring gardening"
                uiImageSrc={src(
                  `homepage/${localeForImage}aad_yardwork_ui`,
                  'png',
                  400,
                )}
                uiImageAlt="Oura automatic activity notification and activity progress app UI"
              >
                <Typography>{t('responds_to_you_aad_description')}</Typography>
              </FeaturedSection>
            </div>
            <div>
              <FeaturedSection
                title={'responds_to_you_nap_title'}
                imageSrc={srcSet('homepage/aad_nap', 'jpg', [500]).srcSet}
                imageAlt="Man napping with Oura gold ring"
                uiImageSrc={src(
                  `homepage/${localeForImage}aad_nap_ui`,
                  'png',
                  400,
                )}
                uiImageAlt="Oura automatic nap detection notification"
                reverse
              >
                <Typography>{t('responds_to_you_nap_description')}</Typography>
              </FeaturedSection>
            </div>
            <div>
              <FeaturedSection
                title={'responds_to_you_rest_title'}
                imageSrc={srcSet('homepage/aad_rest', 'jpg', [500]).srcSet}
                imageAlt="Woman resting in garden wearing an Oura black ring"
                uiImageSrc={
                  srcSet(`homepage/${localeForImage}aad_rest_ui`, 'png', [400])
                    .src
                }
                uiImageAlt="Oura low readiness score shown with rest mode notification"
              >
                <Typography>{t('responds_to_you_rest_description')}</Typography>
              </FeaturedSection>
            </div>
          </div>
        </div>
      </Waypoint>
    </>
  );
};

export default BilboRespondsToYou;
