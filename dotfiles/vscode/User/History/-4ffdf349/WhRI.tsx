import { Avatar } from '@material-ui/core';
import cx from 'classnames';
import { useState } from 'react';
import { useA11yContext } from '../../../contexts/A11yContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { MessageKey } from '../../../public/locales/setup';
import { breakpoints } from '../constants';
import Typography from '../Typography';
import Waypoint from '../Waypoint';
import styles from './QuoteSlider.module.scss';

interface QuoteCardProps {
  text: MessageKey;
  name?: string;
  title?: string;
  avatarUrl?: string;
}

const QuoteCard = ({ text, name, title, avatarUrl }: QuoteCardProps) => {
  const isMinWidthXL = useMediaQuery(`(min-width:${breakpoints.xlarge}px)`);
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);
  const isMinWidthMed = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  const getStyle = () => {
    if (isMinWidthXL) return styles['QuoteCard--xl'];
    if (isMinWidthLarge) return styles.QuoteCard;
    if (isMinWidthMed) return styles['QuoteCard--tablet'];
    return styles['QuoteCard--mobile'];
  };

  return (
    <div className={getStyle()}>
      <Typography>&ldquo;{text}&rdquo;</Typography>

      <div className="flex items-center mt-8">
        {avatarUrl && <Avatar src={avatarUrl} alt={`Avatar for ${name}`} />}

        <div className="ml-4">
          {name && (
            <Typography variant="body2" weight="bold">
              {name}
            </Typography>
          )}

          {title && <Typography variant="caption">{title}</Typography>}
        </div>
      </div>
    </div>
  );
};

interface QuoteSliderProps {
  quotes: QuoteCardProps[];
}

const QuoteSlider = ({ quotes }: QuoteSliderProps): JSX.Element => {
  const { prefersReducedMotion } = useA11yContext();
  const [scrolling, setScrolling] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMinWidthXL = useMediaQuery(`(min-width:${breakpoints.xlarge}px)`);
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);
  const isMinWidthMed = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  const pauseScrolling = () => setHovered(true);
  const resumeScrolling = () => setHovered(false);

  const data = prefersReducedMotion ? quotes : [...quotes, ...quotes];

  const getStyle = () => {
    if (isMinWidthXL) return styles['QuoteSlider--xl'];
    if (isMinWidthLarge) return styles.QuoteSlider;
    if (isMinWidthMed) return styles['QuoteSlider--tablet'];
    return styles['QuoteSlider--mobile'];
  };

  return (
    <Waypoint
      topOffset="50%"
      onEnter={() => {
        // only set once
        if (!scrolling) setScrolling(true);
      }}
    >
      <div
        onMouseEnter={pauseScrolling}
        onMouseLeave={resumeScrolling}
        style={{
          overflow: 'hidden',
        }}
      >
        <div
          className={cx(getStyle(), {
            'animation-none': prefersReducedMotion,
            'overflow-x-scroll': prefersReducedMotion,
          })}
          style={{
            animationPlayState: hovered ? 'paused' : 'running',
          }}
        >
          {data.map(({ name, title, text, avatarUrl }, index) => (
            <QuoteCard
              key={`quote-${index}`}
              title={title}
              text={text}
              name={name}
              avatarUrl={avatarUrl}
            />
          ))}
        </div>
      </div>
    </Waypoint>
  );
};

export default QuoteSlider;
