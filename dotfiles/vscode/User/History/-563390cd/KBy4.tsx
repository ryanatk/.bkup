import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { Grid, Image } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Em, Subtitle, Title } from './components';

interface BilboTempSensorsProps {}

const BilboTempSensors = ({}: BilboTempSensorsProps): JSX.Element => {
  const localeForImage = useLocaleForImage();
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  return (
    <div className="bg-goldenHour">
      <div className="mb-16">
        <Image
          className="object-cover w-screen h-full"
          // {...srcSet(
          //   isMinWidthMedium
          //     ? 'homepage/d-period-prediction-mask-images@2x'
          //     : 'homepage/m-period-prediction-mask-images@2x',
          //   'png',
          //   [400, 600, 900, 1200, 1600],
          // )}
          shortSrc="homepage/m-period-prediction-mask-images@2x.png"
          responsiveImages={[
            {
              shortSrc: 'homepage/m-period-prediction-mask-images@2x.png',
              width: breakpoints.medium,
            },
            {
              shortSrc: 'homepage/d-period-prediction-mask-images@2x.png',
              width: 2160,
            },
          ]}
          sizes={`(max-width: ${breakpoints.medium}px ${breakpoints.medium}px), 100vw`}
          alt=""
          loading="lazy"
        />
      </div>

      <Grid className="mb-16">
        <Title>
          {t('experience_cycle_title', {
            em: <Em>{t('experience_cycle_title.em')}</Em>,
          })}
        </Title>

        <Subtitle>{t('experience_cycle_subtitle')}</Subtitle>
      </Grid>

      <div className="my-16">
        {/* <FeatureCollage
          mainImage={
            <img
              {...dprSrcSet(featureCollageMainImage, 'jpg', 400)}
              alt="Woman packing a bag with Oura ring on hand"
              className="w-full"
              loading="lazy"
            />
          }
          mainImageDesktop={
            <img
              {...dprSrcSet(featureCollageMainImageDesktop, 'jpg', 800)}
              alt="Woman packing a bag with Oura ring on hand"
              loading="lazy"
            />
          }
          deviceImage={
            <img
              {...dprSrcSet(
                `homepage/${localeForImage}temperature_app_ui`,
                'png',
                270,
              )}
              alt="Oura app temperature trends and insights"
              loading="lazy"
            />
          }
          bottomContent={
            <Typography>{t('temp_sensors_collage_text')}</Typography>
          }
        /> */}
      </div>

      {/* <Grid className="my-16">
        <div className="col-full md:col-main md:col-start-2 md:col-end-8 lg:col-start-3 lg:col-end-8">
          <img
            {...dprSrcSet(
              `homepage/${localeForImage}temperature_using_the_app`,
              'jpg',
              500,
            )}
            alt="Closeup of phone in hand, showing Oura app, with Oura ring on"
            loading="lazy"
          />
        </div>

        <div className="col-start-2 col-end-6 lg:self-center md:col-start-9 md:col-span-5 lg:col-end-13 text-helsinkiBlue">
          <Typography variant="h6" className="mb-16">
            {t('temp_sensors_cycle_title')}{' '}
            {t('temp_sensors_cycle_description')}
          </Typography>

          <div className="flex flex-col gap-8 lg:gap-16">
            <div>
              <TOCEntry
                label={t('temp_sensors_cycle_predict_title')}
                summary={t('temp_sensors_cycle_predict_description')}
                icon={
                  <Icon>
                    <IconTemperature />
                  </Icon>
                }
              />
            </div>

            <div>
              <TOCEntry
                label={t('temp_sensors_cycle_picture_title')}
                summary={t('temp_sensors_cycle_picture_description')}
                icon={
                  <Icon>
                    <IconCalendar />
                  </Icon>
                }
              />
            </div>

            <div>
              <TOCEntry
                label={t('temp_sensors_cycle_smarter_title')}
                summary={t('temp_sensors_cycle_smarter_description')}
                icon={
                  <Icon>
                    <IconCheckmarkLarge />
                  </Icon>
                }
              />
            </div>
          </div>
        </div>
      </Grid> */}
    </div>
  );
};

export default BilboTempSensors;
