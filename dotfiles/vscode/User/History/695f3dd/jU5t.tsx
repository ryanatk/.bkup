import { FormattedMessage } from 'react-intl';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import IconSpeaker from '../../../svg/icon-speaker-on.svg';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Typography } from '../../sormus';
import { GuidedSessions } from '../_global';
import { Em, Feature, Header, Section } from './components';

const ExperienceRelax = (): JSX.Element => {
  const localeForImage = useLocaleForImage();

  return (
    <Section>
      <Header
        title={
          <FormattedMessage
            id="experience_relax_title"
            values={{
              em: <Em>{t('experience_relax_title.em')}</Em>,
            }}
          />
        }
        subtitle={t('experience_relax_subtitle')}
      />

      <Feature
        title={t('experience_relax_feature_1_title')}
        body={t('experience_relax_feature_1_body')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
      >
        <Typography color="plum-light" className="mt-8 mb-4">
          <IconSpeaker /> {t('experience_relax_sound_on')}
        </Typography>

        <GuidedSessions />
      </Feature>

      <Feature
        title={t('experience_relax_feature_2_title')}
        body={t('experience_relax_feature_2_body')}
        // TODO: update to use Image
        imageProps={dprSrcSet(
          `homepage/${localeForImage}sleep-staging-ui@3x`,
          'png',
          270,
        )}
        reverse
      />

      <div>
        <Feature
          title={t('experience_relax_feature_3_title')}
          body={t('experience_relax_feature_3_body')}
          imageProps={dprSrcSet(
            `homepage/${localeForImage}sleep-staging-ui@3x`,
            'png',
            270,
          )}
        />
      </div>
    </Section>
  );
};

export default ExperienceRelax;
