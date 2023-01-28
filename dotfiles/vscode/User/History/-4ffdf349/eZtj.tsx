import cx from 'classnames';
import { useState } from 'react';
import { useA11yContext } from '../../../contexts/A11yContext';
import QuoteCard, { QuoteCardProps } from '../QuoteCard';
import Waypoint from '../Waypoint';
import styles from './QuoteSlider.module.scss';

interface QuoteSliderProps {
  quotes: QuoteCardProps[];
}

const QuoteSlider = ({ quotes }: QuoteSliderProps): JSX.Element => {
  const { prefersReducedMotion } = useA11yContext();
  const [scrolling, setScrolling] = useState(false);
  const [hovered, setHovered] = useState(false);

  const pauseScrolling = () => setHovered(true);
  const resumeScrolling = () => setHovered(false);

  const data = prefersReducedMotion ? quotes : [...quotes, ...quotes];

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
          className={cx([styles.wrap], {
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
