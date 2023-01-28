import cx from 'classnames';
import { useState } from 'react';
import CountUp from 'react-countup';
import { t } from '../../../public/locales/LocaleContext';
import { Image, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import Typography from '../../sormus/Typography';
import styles from './ExperienceCounter.module.scss';

const ExperienceCounter = (): JSX.Element => {
  const [playAnimation, setPlayAnimation] = useState(false);

  return (
    <div className="relative h-screen">
      <Image
        className="absolute h-full w-screen object-cover"
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
            <div className={styles.content}>
              <Typography variant="h6" color="white" className="mb-5">
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
              </div>

              <Typography
                color="white"
                className={styles.counter}
                weight="normal"
              >
                <span ref={countUpRef} />
              </Typography>

              <Typography color="white" className={styles.summary}>
                {t('readiness_sequence_subtitle')}
              </Typography>
            </div>
          </Waypoint>
        )}
      </CountUp>
    </div>
  );
};

export default ExperienceCounter;
