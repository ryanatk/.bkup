import { Waypoint } from 'react-waypoint';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Grid } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Em, Feature, Section, Subtitle, Title } from './components';

interface Props {
  setDynamicPageClasses: (classes: string) => void;
}

const ExperienceSleep = ({ setDynamicPageClasses }: Props): JSX.Element => {
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const localeForImage = useLocaleForImage();

  return (
    <Section>
      <Grid>
        <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-13">
          <Title>
            {t('experience_sleep_title', {
              em: <Em>{t('experience_sleep_title.em')}</Em>,
            })}
          </Title>
        </div>

        <div className="col-start-2 col-end-6 md:col-start-8 md:col-end-13">
          <Subtitle>{t('experience_sleep_subtitle')}</Subtitle>
        </div>
      </Grid>

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      />

      <Feature
        title={t('sleep_accuracy_algo_title')}
        description={t('sleep_accuracy_algo_description')}
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
        reverse
      />

      <Waypoint
        scrollableAncestor={window}
        bottomOffset="20%"
        topOffset="60%"
        onEnter={() => setDynamicPageClasses('bg-helsinkiBlue-dark text-white')}
      >
        <div>
          <Feature
            title={t('sleep_accuracy_algo_title')}
            description={t('sleep_accuracy_algo_description')}
            imageProps={dprSrcSet(
              `homepage/${localeForImage}sleep-staging-ui@3x`,
              'png',
              270,
            )}
          />

          <Feature
            title={t('sleep_accuracy_algo_title')}
            description={t('sleep_accuracy_algo_description')}
            imageProps={dprSrcSet(
              `homepage/${localeForImage}sleep-staging-ui@3x`,
              'png',
              270,
            )}
            reverse
          />
        </div>
      </Waypoint>
    </Section>
  );
};

export default ExperienceSleep;
