import { FeatureHighlight, Typography } from '../../../sormus';

interface FeatureProps {
  title?: string | Element;
  description?: string | Element;
  children?: any;
  imageProps: {
    src: string;
    srcSet: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
  };
  reverse?: boolean;
}

const Feature = ({
  title,
  description,
  imageProps,
  reverse,
  children = <></>,
}: FeatureProps): JSX.Element => {
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

export default Feature;