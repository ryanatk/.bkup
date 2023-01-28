import cx from 'classnames';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { breakpoints } from '../constants';
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
}: SlideshowKolmeProps): JSX.Element => {
  const isLargeScreen = useMediaQuery(`(min-width:${breakpoints.large}px)`);

  return (
    <Slideshow
      darkMode={darkMode}
      items={items}
      interval={interval}
      onNavNext={onSlideChange}
      onNavPrev={onSlideChange}
      imageLoading={imageLoading}
      resetOnItemsChange={false}
    >
      <Grid rowCount={title && !isLargeScreen ? 4 : 3}>
        {title && (
          <Typography
            Element="h2"
            variant="h3"
            color="inherit"
            className={cx(styles.title, {
              [styles.left]: reverse,
              [styles.right]: !reverse,
            })}
          >
            {t(title)}
          </Typography>
        )}

        <div
          className={cx(styles.text, {
            [styles.left]: reverse,
            [styles.right]: !reverse,
            [styles.primary]: !title,
            [styles.secondary]: title,
          })}
        >
          <SlideshowCurrentContent />
        </div>

        <div
          className={cx(styles.media, {
            [styles.right]: reverse,
            [styles.left]: !reverse,
            [styles.primary]: !title,
            [styles.secondary]: title,
          })}
        >
          <MediaWrapper showDeviceWrapper={showDeviceWrapper}>
            <SlideshowCurrentMedia />
          </MediaWrapper>
        </div>

        <div
          className={cx(styles.navigation, {
            [styles.left]: reverse,
            [styles.right]: !reverse,
          })}
        >
          <SlideshowNavigation />
        </div>
      </Grid>
    </Slideshow>
  );
};

export default SlideshowKolme;
