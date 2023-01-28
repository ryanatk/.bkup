import cx from 'classnames';
import { ReactElement } from 'react';
import { Grid, Image, Typography } from '../../../../sormus';
import { RING_GEN, RING_IMAGES } from '../data';

const FsaRings = (): ReactElement => {
  const ringGens = Object.values(RING_GEN);

  return (
    <Grid className="bg-grayscale3">
      <Typography
        color="grayMedium"
        className={cx(
          'justify-center items-center',
          'col-main flex flex-col',
          'lg:flex-row lg:col-start-3 lg:col-end-12',
        )}
      >
        {ringGens.map((gen, i) => (
          <section
            key={'section' + gen}
            className={cx('text-center py-8', {
              'border-b lg:border-b-0 lg:border-r lg:rounded-3xl':
                i < ringGens.length - 1,
              'border-grayscale-text': i < ringGens.length - 1,
            })}
          >
            <Typography Element="h2" variant="h3" color="inherit">
              {gen}
            </Typography>

            <ul className={cx('flex justify-center flex-wrap')}>
              {RING_IMAGES.filter((RING) => RING.gen === gen).map(
                ({ alt, originalSrc, color }) => (
                  <li
                    key={'li' + gen + color}
                    className="flex-shrink-0 w-36 lg:w-28 p-1 bg-grayscale3"
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
