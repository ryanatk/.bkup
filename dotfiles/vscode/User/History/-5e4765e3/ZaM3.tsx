import cx from 'classnames';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { Grid, Image, Typography } from '../../sormus';
import styles from './BilboRespondsToYou/BilboRespondsToYou.module.scss';
import { Em, Section, Subtitle, Title } from './components';

interface FeaturedSectionProps {
  title: MessageKey;
  text: MessageKey;
  mainImage: {
    alt: string;
    src: string;
  };
  sideImage: {
    alt: string;
    src: string;
  };
  reverse?: boolean;
}

const FeaturedSection = ({
  mainImage,
  sideImage,
  title,
  text,
  reverse,
}: FeaturedSectionProps) => {
  return (
    <Grid>
      <div className={cx(styles.images, { [styles.reverse]: reverse })}>
        <div className={styles.sideImage}>
          <Image shortSrc={sideImage.src} alt={sideImage.alt} loading="lazy" />
        </div>

        <Image shortSrc={mainImage.src} alt={mainImage.alt} loading="lazy" />
      </div>

      <div className={cx(styles.content, { [styles.reverse]: reverse })}>
        <Typography variant="h6" Element="h3" className="mb-4" weight="normal">
          {t(title)}
        </Typography>

        <Typography>{t(text)}</Typography>
      </div>
    </Grid>
  );
};

const ExperienceRest = (): JSX.Element => {
  const localeForImage = useLocaleForImage();

  return (
    <Section>
      <Grid className="mb-16">
        <Title>
          {t('experience_readiness_title', {
            em: <Em>{t('experience_readiness_title.em')}</Em>,
          })}
        </Title>

        <Subtitle>{t('experience_readiness_subtitle')}</Subtitle>
      </Grid>

      <div className="flex flex-col gap-24 mt-24 lg:mt-20">
        <FeaturedSection
          title="responds_to_you_rest_title"
          text="responds_to_you_rest_description"
          mainImage={{
            src: 'homepage/aad_rest.jpg',
            alt: 'Woman resting in garden wearing an Oura black ring',
          }}
          sideImage={{
            src: `homepage/${localeForImage}aad_rest_ui.png`,
            alt: 'Oura low readiness score shown with rest mode notification',
          }}
        />

        <FeaturedSection
          title="responds_to_you_nap_title"
          text="responds_to_you_nap_description"
          mainImage={{
            src: 'homepage/aad_nap.jpg',
            alt: 'Man napping with Oura gold ring',
          }}
          sideImage={{
            src: `homepage/${localeForImage}aad_nap_ui.png`,
            alt: 'Oura automatic nap detection notification',
          }}
          reverse
        />
      </div>
    </Section>
  );
};

export default ExperienceRest;
