import { ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { useA11yContext } from '../../../contexts/A11yContext';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { Image, Typography } from '../../sormus';

export interface LearnMoreBlockProps {
  image: {
    src: string;
    alt: MessageKey;
  };
  title: MessageKey;
  body: MessageKey;
}

const LearnMoreBlock = ({
  image,
  title,
  body,
}: LearnMoreBlockProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const { prefersReducedMotion } = useA11yContext();
  const { formatMessage } = useIntl();

  const spring =
    useSpring({
      opacity: visible ? '1' : '0',
      transform: `translate3d(0, ${visible ? '0' : '5%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

  return (
    <a.div
      className="max-w-md mx-auto"
      style={prefersReducedMotion ? {} : spring}
    >
      <Waypoint
        bottomOffset="25%"
        onEnter={() => {
          if (!visible) setVisible(true);
        }}
      />

      <Image
        className="mb-4 w-full"
        src={image.src}
        alt={formatMessage({ id: image.alt })}
        loading="lazy"
      />

      <Typography
        color="inherit"
        weight="normal"
        Element="h3"
        className="mb-2 text-xl"
      >
        {t(title)}
      </Typography>

      <Typography className="text-base" color="inherit">
        {t(body)}
      </Typography>
    </a.div>
  );
};

export default LearnMoreBlock;
