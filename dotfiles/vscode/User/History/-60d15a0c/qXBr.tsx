import cx from 'classnames';
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
      <Grid rowCount={2}>
        <div
          className={cx(styles.textWrap, {
            [styles.left]: reverse,
            [styles.right]: !reverse,
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
