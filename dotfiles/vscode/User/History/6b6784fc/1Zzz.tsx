import { FeatureHighlight, Typography } from '../../../sormus';

interface HighlightProps {
  title?: string;
  description?: string;
  children?: any;
  imageProps: {
    src: string;
    srcSet: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
  };
  reverse?: boolean;
}

const Highlight = ({
  title,
  description,
  imageProps,
  reverse,
  children = <></>,
}: HighlightProps): JSX.Element => {
  // merge imageProps with defaults
  const { src, srcSet, alt, loading } = Object.assign(
    { alt: '', loading: 'lazy' },
    imageProps,
  );

  return (
    <FeatureHighlight
      contentElement={
        <>
          {title && (
            <Typography
              variant="h5"
              Element="h3"
              className="mb-4"
              weight="normal"
              color="inherit"
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography color="inherit">{description}</Typography>
          )}

          {children}
        </>
      }
      deviceContent={
        <img src={src} srcSet={srcSet} alt={alt} loading={loading} />
      }
      reverse={reverse}
    />
  );
};

export default Highlight;
