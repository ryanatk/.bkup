import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import { FeatureHighlight, Grid, Typography } from '../../../sormus';
import AudioPlayer from '../../../sormus/AudioPlayer';
import Image from '../../../sormus/Image';

interface BilboGuidedSessionsProps {
  setDynamicPageClasses?: (classes: string) => void;
  title?: MessageKey;
}

const BilboGuidedSessions = ({
  setDynamicPageClasses = () => '',
  title = 'guided_sessions_title',
}: BilboGuidedSessionsProps) => {
  const localeForImage = useLocaleForImage();
  const isImageShrinking = checkFeatureFlag('undo-image-shrinking');

  return (
    <>
      <Waypoint
        scrollableAncestor={window}
        bottomOffset="20%"
        topOffset="60%"
        onEnter={() => setDynamicPageClasses('bg-dawnBlue text-helsinkiBlue')}
      >
        <div>
          <Grid>
            <div className="col-main md:col-start-2 md:col-end-13 lg:col-start-3 lg:col-end-11">
              <Typography
                Element="h2"
                variant="h1"
                className="mb-6"
                color="inherit"
              >
                {t(title)}
              </Typography>
            </div>
          </Grid>
          <Grid className="mb-24">
            <div className="col-main md:col-start-8 md:col-end-13">
              <Typography variant="h4" className="lg:mb-24" color="inherit">
                {t('guided_sessions_description')}
              </Typography>
            </div>
          </Grid>
          <div className="md:-mt-40 lg:-mt-64">
            <FeatureHighlight
              contentElement={
                <>
                  <Typography
                    variant="h5"
                    className="mb-4"
                    weight="normal"
                    color="inherit"
                  >
                    {t('guided_sessions_highlight_title')}
                  </Typography>
                  <Typography color="inherit">
                    {t('guided_sessions_highlight_description')}
                  </Typography>
                  <div className="mt-6 flex flex-col gap-2">
                    <div>
                      <AudioPlayer
                        label={'guided_sessions_audio_1_label'}
                        thumbnailShortSrc={`homepage/explore-audio-thumb-01${
                          isImageShrinking && '-shrink'
                        }.png`}
                        src="https://s3.amazonaws.com/ouraring.com/audio/insight-and-creativity-sample.mp3"
                      />
                    </div>
                    <div>
                      <AudioPlayer
                        label={'guided_sessions_audio_2_label'}
                        thumbnailShortSrc="homepage/explore-audio-thumb-02.png"
                        src="https://s3.amazonaws.com/ouraring.com/audio/breath-relaxation-sample.mp3"
                      />
                    </div>
                    <div>
                      <AudioPlayer
                        label={'guided_sessions_audio_3_label'}
                        thumbnailShortSrc="homepage/explore-audio-thumb-03.png"
                        src="https://s3.amazonaws.com/ouraring.com/audio/restful-sleep-sample.mp3"
                      />
                    </div>
                  </div>
                </>
              }
              deviceContent={
                <Image
                  shortSrc={`homepage/${localeForImage}explore-main-ui@3x.png`}
                  width={270}
                  dprs={[1, 2, 3]}
                  alt=""
                  loading="lazy"
                />
              }
            />
            <Waypoint
              scrollableAncestor={window}
              bottomOffset="20%"
              topOffset="60%"
              onEnter={() =>
                setDynamicPageClasses('bg-purpleRain text-helsinkiBlue')
              }
            >
              <div>
                <FeatureHighlight
                  contentElement={
                    <>
                      <Typography
                        variant="h6"
                        Element="h3"
                        className="mb-4"
                        weight="normal"
                        color="inherit"
                      >
                        {t('guided_sessions_highlight_2_title')}
                      </Typography>
                      <Typography color="inherit">
                        {t('guided_sessions_highlight_2_description')}
                      </Typography>
                    </>
                  }
                  deviceContent={
                    <Image
                      shortSrc={`homepage/${localeForImage}explore-feedback-ui@3x.png`}
                      width={270}
                      dprs={[1, 2, 3]}
                      alt=""
                      loading="lazy"
                    />
                  }
                  reverse
                />
                <FeatureHighlight
                  contentElement={
                    <>
                      <Typography
                        variant="h6"
                        Element="h3"
                        className="mb-4"
                        weight="normal"
                        color="inherit"
                      >
                        {t('guided_sessions_highlight_3_title')}
                      </Typography>
                      <Typography color="inherit">
                        {t('guided_sessions_highlight_3_description')}
                      </Typography>
                    </>
                  }
                  deviceContent={
                    <Image
                      shortSrc={`homepage/${localeForImage}explore-edu-ui@3x.png`}
                      width={270}
                      dprs={[1, 2, 3]}
                      alt=""
                      loading="lazy"
                    />
                  }
                />
              </div>
            </Waypoint>
          </div>
        </div>
      </Waypoint>
    </>
  );
};

export default BilboGuidedSessions;
