import cx from 'classnames';
import { ReactElement } from 'react';
import { Grid, Image, Typography } from '../../../../sormus';
import { RING_GEN, RING_IMAGES } from '../data';
import styles from './FsaRings.module.scss';

const FsaRings = (): ReactElement => {
  const ringGens = Object.values(RING_GEN);

  return (
    <Grid className="bg-grayscale3">
      <Typography
        Element="div"
        color="grayMedium"
        className={cx(
          'justify-center items-center',
          'col-main lg:col-start-3 lg:col-end-13',
          'flex flex-col lg:flex-row',
          'py-12 lg:py-20',
        )}
      >
        {ringGens.map((gen) => (
          <section
            key={'section' + gen}
            className={cx(styles.border, 'text-center')}
          >
            <Typography Element="h2" variant="h3" color="inherit">
              {gen}
            </Typography>

            <ul className="flex justify-center flex-wrap mt-4">
              {RING_IMAGES.filter((RING) => RING.gen === gen).map(
                ({ alt, originalSrc, color }) => (
                  <li
                    key={'li' + gen + color}
                    className="flex-shrink-0 w-36 lg:w-32 p-1 bg-grayscale3"
                  >
                    <figure className="text-center">
                      <Image
                        originalSrc={originalSrc}
                        alt={alt}
                        width={136}
                        className="w-full"
                        style={{
                          aspectRatio: '4/3', // tailwind v2 plugin does not work as expected
                        }}
                      />
                      <figcaption>{color}</figcaption>
                    </figure>
                  </li>
                ),
              )}
            </ul>
          </section>
        ))}
      </Typography>
    </Grid>
  );
};

export default FsaRings;
