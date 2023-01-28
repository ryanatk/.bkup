import cx from 'classnames';
import { useState } from 'react';
import CountUp from 'react-countup';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Image, Waypoint } from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import Typography from '../../sormus/Typography';
import styles from './ExperienceCounter.module.scss';

const ExperienceCounter = (): JSX.Element => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

  return (
    <div className={styles.wrap}>
      <Image
        className={styles.image}
        alt=""
        src={
          isMediumScreen
            ? src('experience/d-oe-readiness-intro-img@2x', 'jpg')
            : src(
                'experience/m-oe-readiness-intro-img@2x',
                'jpg',
                breakpoints.medium,
              )
        }
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
    </div>
  );
};

export default ExperienceCounter;
