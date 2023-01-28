import cx from 'classnames';
import { useState } from 'react';
import CountUp from 'react-countup';
import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import { Image, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import Typography from '../../sormus/Typography';
import styles from './ExperienceCounter.module.scss';

const Wrap = tw.div`
relative h-screen w-full flex flex-col items-center justify-center
`

const ExperienceCounter = (): JSX.Element => {
  const [playAnimation, setPlayAnimation] = useState(false);

  return (
    // <div className={styles.wrap}>
    <Wrap>
      <Image
        className={styles.image}
        alt=""
        shortSrc="homepage/d-hr-transition-fullbleed@2x.jpg"
        responsiveImages={[
          {
            shortSrc: 'homepage/m-hr-transition-fullbleed@2x.jpg',
            width: breakpoints.medium,
          },
          {
            shortSrc: 'homepage/d-hr-transition-fullbleed@2x.jpg',
            width: 1800,
          },
        ]}
        sizes={`(max-width: ${breakpoints.medium}px ${breakpoints.medium}px), 100vw`}
        loading="lazy"
      />

      <CountUp start={0} end={82} duration={1.75}>
        {({ countUpRef, start, reset }) => (
          <Waypoint
            className={styles.content}
            bottomOffset="30%"
            topOffset={0}
            onEnter={() => {
              start();
              setPlayAnimation(true);
            }}
            onLeave={() => {
              reset();
              setPlayAnimation(false);
            }}
          >
            <Typography variant="h6" color="inherit">
              <strong className="font-bold">
                {t('readiness_sequence_title')}
              </strong>
            </Typography>

            <div className={styles.progress}>
              <div className={styles.circle} />
              <div
                className={cx(styles.circle, {
                  [styles.fill]: playAnimation,
                  'animate-fillProgress': playAnimation,
                })}
              />

              <Typography
                color="inherit"
                className={styles.counter}
                weight="normal"
              >
                <span ref={countUpRef} />
              </Typography>
            </div>

            <Typography color="inherit" className={styles.summary}>
              {t('readiness_sequence_subtitle')}
            </Typography>
          </Waypoint>
        )}
      </CountUp>
      </Wrap>
    {/* </div> */}
  );
};

export default ExperienceCounter;
