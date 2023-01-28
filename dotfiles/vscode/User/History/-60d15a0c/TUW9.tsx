import cx from 'classnames';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Box from '../Box';
import DeviceWrapper from '../DeviceWrapper';
import Grid from '../Grid';
import {
  Slideshow,
  SlideshowCurrentContent,
  SlideshowCurrentMedia,
  SlideshowNavigation,
} from '../Slideshow';
import { SlideshowItem } from '../Slideshow/typeDefs';
import Typography from '../Typography';
import styles from './SlideshowKolme.module.scss';

interface SlideshowKolmeProps {
  title?: MessageKey;
  items: SlideshowItem[];
  darkMode?: boolean;
  interval?: number;
  showDeviceWrapper?: boolean;
  onSlideChange?: (index: number) => void;
  imageLoading?: 'lazy';
  reverse?: boolean;
}

const Title = ({ text }) => (
  <Typography
    Element="h2"
    variant="h3"
    color="inherit"
    className={styles['Title']}
  >
    {text}
  </Typography>
);

const MediaWrapper = ({ children, showDeviceWrapper = true }) =>
  showDeviceWrapper ? <DeviceWrapper>{children}</DeviceWrapper> : children;

const SlideshowKolme = ({
  title,
  items,
  imageLoading,
  darkMode = false,
  interval = 0,
  showDeviceWrapper = true,
  onSlideChange = () => {},
  reverse,
}: SlideshowKolmeProps) => {
  return (
    <Slideshow
      darkMode={darkMode}
      items={items}
      interval={interval}
      onNavNext={onSlideChange}
      onNavPrev={onSlideChange}
      imageLoading={imageLoading}
    >
      {title && (
        <Box className={styles['Title--SmallScreen']}>
          <Title text={t(title)} />
        </Box>
      )}
      <Grid>
        <div className={styles.Slideshow__Media}>
          <div className={styles.Slideshow__MediaCompartment}>
            <MediaWrapper showDeviceWrapper={showDeviceWrapper}>
              <SlideshowCurrentMedia />
            </MediaWrapper>
          </div>
        </div>
        <div className={styles.Slideshow__Content}>
          {title && (
            <div aria-hidden className={styles['Title--LargeScreen']}>
              <Title text={t(title)} />
            </div>
          )}
          <div
            className={cx(styles.Slideshow__ContentCompartment, {
              [styles.reverse]: reverse,
            })}
          >
            <div>
              <SlideshowNavigation />
            </div>
            <div className="mt-6 lg:mt-0">
              <SlideshowCurrentContent />
            </div>
          </div>
        </div>
      </Grid>
    </Slideshow>
  );
};

export default SlideshowKolme;
