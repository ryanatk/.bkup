import { useState } from 'react';
import { useIntl } from 'react-intl';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import { Image, Typography } from '../../sormus';
import { LearnMoreBlockData } from './data/learnMoreData';

const Wrapper = tw(a.div)`
  max-w-md
  mx-auto
  text-helsinkiBlue-dark
`;

const ImageFeature = tw(Image)`
  mb-4
  w-full
`;

const Title = tw(Typography)`
  mb-2
  text-xl
`;

const Body = tw(Typography)`
  text-base
`;

const LearnMoreBlock = ({
  image,
  title,
  body,
}: LearnMoreBlockData): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const spring = useSpring({
    opacity: visible ? 1 : 0,
    transform: `translate3d(0, ${visible ? '0' : '5%'}, 0)`,
    config: { ...config.molasses },
  });
  const { formatMessage } = useIntl();
  return (
    <Wrapper style={spring}>
      <Waypoint
        bottomOffset="25%"
        onEnter={() => {
          if (!visible) setVisible(true);
        }}
      />
      <ImageFeature
        src={image.src}
        alt={formatMessage({ id: image.alt })}
        loading="lazy"
      />
      <Title color="inherit" weight="normal" Element="h3">
        {t(title)}
      </Title>
      <Body color="inherit">{t(body)}</Body>
    </Wrapper>
  );
};

export default LearnMoreBlock;
