import { ReactElement, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { MessageKey } from '../../../../public/locales/setup';
import { dprSrcSet } from '../../../../utils/imageHelpers';
import { FeatureHighlight, Typography } from '../../../sormus';

interface Props {
  title?: string | ReactElement;
  body?: string | ReactElement;
  src: MessageKey;
  alt: string;
  loading?: 'lazy' | 'eager';
  reverse?: boolean;
  children?: ReactNode;
}

const Feature = ({
  title,
  body,
  src: srcKey,
  alt: altKey,
  loading = 'lazy',
  reverse,
  children = <></>,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  // merge imageProps with defaults
  const { src, srcSet, alt } = Object.assign(
    { alt: altKey ? formatMessage({ id: altKey }) : '' },
    dprSrcSet(formatMessage({ id: srcKey }), 'png', 270),
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
