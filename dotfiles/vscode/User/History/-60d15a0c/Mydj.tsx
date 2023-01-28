import cx from 'classnames';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
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
  return (
    <Slideshow
      darkMode={darkMode}
      items={items}
      interval={interval}
      onNavNext={onSlideChange}
      onNavPrev={onSlideChange}
      imageLoading={imageLoading}
    >
      <Grid rowCount={4}>
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
          className={cx(styles.textWrap, {
            [styles.left]: reverse,
            [styles.right]: !reverse,
            [styles.primary]: !title,
            [styles.secondary]: title,
          })}
        >
          <div className={styles.textContent}>
            <SlideshowCurrentContent />
          </div>
        </div>

        <div
          className={cx(styles.mediaWrap, {
            [styles.right]: reverse,
            [styles.left]: !reverse,
            [styles.primary]: !title,
            [styles.secondary]: title,
          })}
        >
          <div className={styles.mediaContent}>
            <MediaWrapper showDeviceWrapper={showDeviceWrapper}>
              <SlideshowCurrentMedia />
            </MediaWrapper>
          </div>
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
