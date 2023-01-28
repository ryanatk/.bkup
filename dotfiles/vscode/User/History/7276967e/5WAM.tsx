import { useMediaQuery } from '@material-ui/core';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { EventType, sendSegmentTrack } from '../../../analytics';
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
import { STYLE_IMAGES } from './data';

interface Props {
  shopNow: string;
}

const ExperienceStyle = ({ shopNow }: Props): JSX.Element => {
  const isMinWidthMedium = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  const [offscreen, setOffscreen] = useState(true);

  const { formatMessage } = useIntl();
  const images = useMemo(
    () =>
      STYLE_IMAGES.map(({ alt, ...item }) => ({
        ...item,
        alt: formatMessage({ id: alt }),
      })),
    [formatMessage],
  );

  return (
    <Section id="style">
      <Grid className="mb-16">
        <div className="col-start-2 col-end-5 md:col-start-3 md:col-end-9">
          <Typography Element="h2" variant="h2" color="inherit">
            <FormattedMessage
              id="experience_style_title"
              values={{
                i(chunks) {
                  return <Em>{chunks}</Em>;
                },
              }}
            />
          </Typography>
        </div>

        <div className="col-start-3 col-end-6 md:col-start-10 md:col-end-13">
          <Subtitle small className="mb-4">
            {t('experience_style_subtitle')}
          </Subtitle>

          <Button
            variant="tertiary"
            size="medium"
            color="helsinkiBlue-dark"
            href={shopNow}
            onClick={() => {
              sendSegmentTrack({
                type: EventType.CTAClicked,
                payload: {
                  cta: 'shop_now',
                  action: 'go_to_pdp',
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
        onEnter={() => {
          if (offscreen) setOffscreen(false);
        }}
      >
        <Grid Element="aside" className="gap-y-0">
          <ImageScroller
            width={isMinWidthMedium ? 330 : 240}
            offscreen={offscreen}
            items={images}
            imagesClassName="col-full"
            scrollbarClassName="col-start-2 col-end-6 md:col-start-3 md:col-end-13 row-start-2"
          />
        </Grid>
      </Waypoint>
    </Section>
  );
};

export default ExperienceStyle;
