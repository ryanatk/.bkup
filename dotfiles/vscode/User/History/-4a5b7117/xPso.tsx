import { ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import { config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { Typography } from '../../sormus';

export interface Props {
  image: {
    src: string;
    alt: MessageKey;
  };
  title: MessageKey;
  body: MessageKey;
}

const Title = tw(Typography)`
  mb-2
  text-xl
`;

const Body = tw(Typography)`
  text-base
`;

const LearnMoreBlock = ({ image, title, body }: Props): ReactElement => {
  const [visible, setVisible] = useState(false);
  const { formatMessage } = useIntl();

  const spring = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translate3d(0, ${visible ? '0' : '5%'}, 0)`,
    config: { ...config.molasses },
  });

  return (
    <div className="max-w-md mx-auto text-helsinkiBlue-dark" style={spring}>
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

      <Title color="inherit" weight="normal" Element="h3">
        {t(title)}
      </Title>

      <Typography className="text-base" color="inherit">
        {t(body)}
      </Typography>
    </div>
  );
};

export default LearnMoreBlock;
