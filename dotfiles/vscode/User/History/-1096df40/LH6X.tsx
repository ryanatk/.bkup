import cx from 'classnames';
import DeviceWrapper from '../DeviceWrapper';
import Grid from '../Grid';
import styles from './FeatureHighlight.module.scss';

export interface FeatureHighlightProps {
  deviceContent: React.ReactElement;
  contentElement: React.ReactElement;
  reverse?: boolean;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  deviceContent,
  contentElement,
  reverse = false,
}) => {
  return (
    <div className={styles.container}>
      <Grid className="items-center">
        <div
          className={cx(styles.device, {
            [styles.reverse]: reverse,
          })}
        >
          <DeviceWrapper>{deviceContent}</DeviceWrapper>
        </div>
        <div className={reverse ? styles.contentReverse : styles.content}>
          {contentElement}
        </div>
      </Grid>
    </div>
  );
};

export default FeatureHighlight;
