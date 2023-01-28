import cx from 'classnames';
import { useIntl } from 'react-intl';
import { useLocaleForImage } from '../../../hooks/useLocaleForImage';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { Grid, Image, Typography } from '../../sormus';
import { Em, Header, Section } from './components';
import styles from './ExperienceRest.module.scss';

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
      <Image
        shortSrc={mainImage.src}
        className={cx(styles.mainImage, { [styles.reverse]: reverse })}
        alt={mainImage.alt}
        responsiveWidths={[212, 448]}
        loading="lazy"
      />

      <div className={cx(styles.sideImage, { [styles.reverse]: reverse })}>
        <Image
          shortSrc={sideImage.src}
          alt={sideImage.alt}
          width={236}
          loading="lazy"
        />
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
  const { formatMessage } = useIntl();

  return (
    <Section>
      <Header
        title={t('experience_rest_title', {
          em: <Em>{t('experience_rest_title.em')}</Em>,
        })}
        subtitle={t('experience_rest_subtitle')}
      />

      <div className="flex flex-col gap-24 mt-32 md:mt-20">
        <FeaturedSection
          title="experience_rest_image_1_title"
          text="experience_rest_image_1_body"
          mainImage={{
            src: 'homepage/aad_rest.jpg',
            alt: '',
          }}
          sideImage={{
            src: `homepage/${localeForImage}aad_rest_ui.png`,
            alt: formatMessage({ id: 'experience_rest_image_1_alt' }),
          }}
        />

        <FeaturedSection
          title="experience_rest_image_2_title"
          text="experience_rest_image_2_body"
          mainImage={{
            src: 'homepage/aad_nap.jpg',
            alt: '',
          }}
          sideImage={{
            src: `homepage/${localeForImage}aad_nap_ui.png`,
            alt: formatMessage({ id: 'experience_rest_image_2_alt' }),
          }}
          reverse
        />
      </div>
    </Section>
  );
};

export default ExperienceRest;
