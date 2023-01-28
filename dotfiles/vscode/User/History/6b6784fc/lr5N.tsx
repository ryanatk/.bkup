import { ReactElement } from 'react';
import { useLocaleForImage } from '../../../../hooks/useLocaleForImage';
import { FeatureHighlight, Typography } from '../../../sormus';

interface ContentElementProps {
  title: string;
  description: string;
}

const ContentElement = ({
  title,
  description,
}: ContentElementProps): JSX.Element => (
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
  reverse?: boolean;
  children?: ReactElement;
}

const Highlight = ({
  title,
  description,
  imgProps,
  reverse,
  children,
}: HighlightProps): JSX.Element => {
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
      deviceContent={<img {...imgProps} />}
      reverse={reverse}
    />
  );
};

export default Highlight;
