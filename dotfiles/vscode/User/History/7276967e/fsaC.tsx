import { useMediaQuery } from '@material-ui/core';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import {
  Button,
  Grid,
  ImageScroller,
  Typography,
  Waypoint,
} from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { Em, Section, Subtitle } from './components';

interface Props {
  shopNow: string;
}

const ExperienceStyle = ({ shopNow }: Props): JSX.Element => {
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);

  const title = useRef<HTMLInputElement>();
  const [offsetLeft, setOffsetLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setOffsetLeft(title?.current?.getBoundingClientRect().x ?? 0);
    };

    const debounced = debounce(handleResize, 50);

    handleResize();

    window.addEventListener('resize', debounced);

    return () => {
      window.removeEventListener('resize', debounced);
    };
  }, []);

  return (
    <Section id="style">
      <Grid className="mb-16">
        <div
          ref={title}
          className="col-start-2 col-end-5 md:col-start-3 md:col-end-9"
        >
          <Typography Element="h2" variant="h2" color="inherit">
            {t('experience_style_title', {
              em: <Em>{t('experience_style_title.em')}</Em>,
            })}
          </Typography>
        </div>

        <div className="col-start-3 col-end-6 md:col-start-10 md:col-end-13">
          <Subtitle small className="mb-4">
            {t('experience_style_subtitle')}
          </Subtitle>

          <Button
            variant="tertiary"
            className="text-bgHelsinkiDark"
            href={shopNow}
            onClick={() => {
              sendGTMWithSegmentEvent({
                type: EventType.CTAClicked,
                payload: {
                  cta: 'buy',
                  location: 'bottom', // TODO: update
                  path: '/oura-experience', // TODO: update
                },
              });
            }}
            link
          >
            {t('experience_style_shop_now')}
          </Button>
        </div>
      </Grid>

      <Waypoint
        onEnter={() => null} // TODO: bump
        onLeave={() => null} // TODO: bump back
      >
        <ImageScroller
          width={isMinWidthMedium ? 330 : 240}
          paddingLeft={offsetLeft}
          items={[
            {
              path: 'experience/lifestyle-carousel-oe-img-01@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-02@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-03@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-04@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-01@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-02@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-03@2x',
              format: 'jpg',
            },
            {
              path: 'experience/lifestyle-carousel-oe-img-04@2x',
              format: 'jpg',
            },
          ]}
        />
      </Waypoint>
    </Section>
  );
};

export default ExperienceStyle;
