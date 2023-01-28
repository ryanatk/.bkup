import { ReactElement } from 'react';
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
  image: {
    src: string;
    srcSet: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
  };
  reverse?: boolean;
  children?: ReactElement;
}

const Highlight = ({
  title,
  description,
  image,
  reverse,
  children,
}: HighlightProps): JSX.Element => {
  const imageProps = Object.assign(
    {},
    {
      alt: '',
      loading: 'lazy',
    },
    image,
  );

  return (
    <FeatureHighlight
      contentElement={
        title && description ? (
          <ContentElement title={title} description={description} />
        ) : (
          children
        )
      }
      deviceContent={<img {...imageProps} />}
      reverse={reverse}
    />
  );
};

export default Highlight;
