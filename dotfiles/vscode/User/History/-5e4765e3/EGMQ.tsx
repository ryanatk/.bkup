import cx from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
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
        <Typography
          variant="h6"
          Element="h3"
          className="mb-4"
          weight="normal"
          color="inherit"
        >
          {t(title)}
        </Typography>

        <Typography color="inherit">{t(text)}</Typography>
      </div>
    </Grid>
  );
};

const ExperienceRest = (): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <Section id="rest">
      <Header
        title={
          <FormattedMessage
            id="experience_rest_title"
            values={{
              i(chunks) {
                return <Em>{chunks}</Em>;
              },
            }}
          />
        }
        subtitle={t('experience_rest_subtitle')}
      />

      <div className="flex flex-col gap-24 mt-32 md:mt-20 lg:mt-32">
        <FeaturedSection
          title="experience_rest_image_1_title"
          text="experience_rest_image_1_body"
          mainImage={{
            src: 'homepage/aad_rest.jpg',
            alt: formatMessage({ id: 'experience_rest_image_1_alt' }),
          }}
          sideImage={{
            src: `homepage/aad_rest_ui.png`,
            alt: formatMessage({ id: 'experience_rest_ui_1_alt' }),
          }}
        />

        <FeaturedSection
          title="experience_rest_image_2_title"
          text="experience_rest_image_2_body"
          mainImage={{
            src: 'homepage/aad_nap.jpg',
            alt: formatMessage({ id: 'experience_rest_image_2_alt' }),
          }}
          sideImage={{
            src: `homepage/aad_nap_ui.png`,
            alt: formatMessage({ id: 'experience_rest_ui_2_alt' }),
          }}
          reverse
        />
      </div>
    </Section>
  );
};

export default ExperienceRest;
