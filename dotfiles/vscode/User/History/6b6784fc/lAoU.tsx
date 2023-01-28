import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { t } from '../../../../public/locales/LocaleContext';
import { dprSrcSet } from '../../../../utils/imageHelpers';
import { FeatureHighlight, Typography } from '../../../sormus';

const Highlight = ({ title, description, imgProps, children }) => {
  const localeForImage = useLocaleForImage();

  return (
    <FeatureHighlight
      contentElement={
        <>
          <Typography
            variant="h5"
            Element="h3"
            className="mb-4"
            weight="normal"
            color="inherit"
          >
            {t('sleep_accuracy_insights_title')}
          </Typography>
          <Typography color="inherit">
            {t('sleep_accuracy_insights_description')}
          </Typography>
        </>
      }
      deviceContent={
        <img
          {...dprSrcSet(
            `homepage/${localeForImage}sleep-vitals-ui@3x`,
            'png',
            270,
          )}
          alt=""
          loading="lazy"
        />
      }
      reverse
    />
  );
};

export default Highlight;
