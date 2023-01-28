import { ReactElement, ReactNode } from 'react';
import { FeatureHighlight, Typography } from '../../../sormus';

interface Props {
  title?: string | ReactElement;
  body?: string | ReactElement;
  children?: ReactNode;
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
  body,
  imageProps,
  reverse,
  children = <></>,
}: Props): JSX.Element => {
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
              variant="h6"
              Element="h3"
              className="mb-4"
              weight="normal"
              color="inherit"
            >
              {title}
            </Typography>
          )}

          {body && <Typography color="inherit">{body}</Typography>}

          {children}
        </>
      }
      deviceContent={
        // TODO: update to use Image
        <img src={src} srcSet={srcSet} alt={alt} loading={loading} />
      }
      reverse={reverse}
    />
  );
};

export default Feature;
