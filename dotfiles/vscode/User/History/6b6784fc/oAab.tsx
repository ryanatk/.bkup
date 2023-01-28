import { ReactElement, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { MessageKey } from '../../../../public/locales/setup';
import { FeatureHighlight, Typography } from '../../../sormus';

interface Props {
  title?: string | ReactElement;
  body?: string | ReactElement;
  children?: ReactNode;
  // imageProps: {
  //   src: string;
  //   srcSet: string;
  //   alt?: string;
  //   loading?: 'lazy' | 'eager';
  // };
  reverse?: boolean;
  src?: MessageKey;
  alt?: string;
}

const Feature = ({
  title,
  body,
  // imageProps,
  reverse,
  children = <></>,
  src: srcKey,
  alt: altKey,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  // merge imageProps with defaults
  const { src, srcSet, alt, loading } = Object.assign(
    { alt: '', loading: 'lazy' },
    imageProps,
    { alt: formatMessage({ id: altKey }) },
  );
  // const { src, srcSet, alt, loading } = Object.assign(
  //   { alt: '', loading: 'lazy' },
  //   imageProps,
  // );

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
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          loading={loading}
          className="w-full h-full object-cover object-center"
        />
      }
      reverse={reverse}
    />
  );
};

export default Feature;
