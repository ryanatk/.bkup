import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { dprSrcSet } from '../../../../utils/imageHelpers';
import { FeatureHighlight, Typography } from '../../../sormus';

interface ContentElementProps {
  title: string;
  description: string;
}

const ContentElement = ({ title, description }) => (
  <>
    <Typography
      variant="h5"
      Element="h3"
      className="mb-4"
      weight="normal"
      color="inherit"
    >
      {title}
    </Typography>

    <Typography color="inherit">{description}</Typography>
  </>
);

interface HighlightProps extends ContentElementProps {
  imgProps: {
    src: string;
    srcSet: string;
  };
}

const Highlight = ({ title, description, imgProps, reverse, children }) => {
  const localeForImage = useLocaleForImage();

  return (
    <FeatureHighlight
      contentElement={
        title && description ? (
          <ContentElement title={title} description={description} />
        ) : (
          children
        )
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
