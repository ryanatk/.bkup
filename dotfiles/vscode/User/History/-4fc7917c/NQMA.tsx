import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { t } from '../../../../public/locales/LocaleContext';
import { Typography } from '../../../sormus';
import SlideshowKolme from '../../../sormus/SlideshowKolme';

const BilboDailyScores = () => {
  const { formatMessage } = useIntl();

  const { asPath } = useRouter();
  const localeForImage = useLocaleForImage();

  const SLIDESHOW_ITEMS = [
    {
      shortSrc: `homepage/${localeForImage}scores-sleep-ui.png`,
      alt: formatMessage({ id: 'sleep_score_card_image' }),
      width: 400,
      content: () => (
        <Typography Element="div" color="inherit">
          <Typography
            Element="h3"
            variant="h6"
            className="mb-3"
            color="inherit"
            weight="normal"
          >
            {t('home_scores_sleep_title')}
          </Typography>
          <Typography color="inherit">{t('home_scores_sleep_text')}</Typography>
        </Typography>
      ),
    },
    {
      shortSrc: `homepage/${localeForImage}scores_activity.png`,
      alt: formatMessage({ id: 'activity_score_card_image' }),
      width: 400,
      content: () => (
        <Typography Element="div" color="inherit">
          <Typography
            Element="h3"
            variant="h6"
            className="mb-3"
            color="inherit"
            weight="normal"
          >
            {t('home_scores_activity_title')}
          </Typography>
          <Typography color="inherit">
            {t('home_scores_activity_text')}
          </Typography>
        </Typography>
      ),
    },
    {
      shortSrc: `homepage/${localeForImage}scores_readiness.png`,
      alt: formatMessage({ id: 'readiness_score_card_image' }),
      width: 400,
      content: () => (
        <Typography Element="div" color="inherit">
          <Typography
            Element="h3"
            variant="h6"
            className="mb-3"
            color="inherit"
            weight="normal"
          >
            {t('home_scores_readiness_title')}
          </Typography>
          <Typography color="inherit">
            {t('home_scores_readiness_text')}
          </Typography>
        </Typography>
      ),
    },
  ];

  const handleAnalytics = (index: number) => {
    sendGTMWithSegmentEvent({
      type: EventType.ModuleClicked,
      payload: {
        location: 'score_module',
        cta: `slide-${index}`,
        path: asPath,
      },
    });
  };

  return (
    <SlideshowKolme
      items={SLIDESHOW_ITEMS}
      title={'home_scores_slideshow_title'}
      onSlideChange={handleAnalytics}
      darkMode
      imageLoading="lazy"
    />
  );
};

export default BilboDailyScores;
