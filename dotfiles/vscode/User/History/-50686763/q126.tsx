import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Waypoint } from 'react-waypoint';
import { t } from '../../../public/locales/LocaleContext';
import IconDiamond from '../../../svg/design-tokens/icon_diamond.svg';
import IconHRV from '../../../svg/design-tokens/icon_hrv.svg';
import IconBattery from '../../../svg/design-tokens/icon_ring_battery.svg';
import IconTemperature from '../../../svg/design-tokens/icon_temperature.svg';
import { dprSrcSet } from '../../../utils/imageHelpers';
import { Grid, TOCEntry, Typography } from '../../sormus';
import Icon from '../../sormus/Icon';
import styles from './ProductBreakthrough.module.scss';

const ProductBreakthrough = (): JSX.Element => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const { formatMessage } = useIntl();

  return (
    <div
      style={{
        background:
          'linear-gradient(72.18deg, #000000 29.6%, #0C1017 48.75%, #11161E 57.55%, #131820 67.78%, #141A22 75.86%, #151B23 83.24%, #151A23 95.85%)',
      }}
      className="text-white py-32"
      data-cy="product-breakthrough"
    >
      <Grid>
        <div className="col-main lg:col-start-3 lg:col-end-13">
          <Typography color="inherit" variant="h2" Element="h2" align="center">
            <FormattedMessage
              id="pdp_horizon_breakthrough_title"
              values={{
                i(chunks) {
                  return <em className="font-serif">{chunks}</em>;
                },
              }}
            />
          </Typography>
          <Typography
            color="inherit"
            align="center"
            className="mt-6 max-w-xl mx-auto"
          >
            {t('pdp_horizon_breakthrough_subtitle')}
          </Typography>
        </div>
        <Waypoint
          scrollableAncestor={window}
          bottomOffset="20%"
          topOffset="60%"
          onEnter={() => setPlayAnimation(true)}
          onLeave={() => setPlayAnimation(false)}
        >
          <div className="col-main">
            <div className="relative">
              <div className="text-center">
                <img
                  {...dprSrcSet(
                    'product/simple/pdp-tldr-silver-lights-horizon@2x',
                    'png',
                    674,
                  )}
                  alt={formatMessage({
                    id: 'pdp_horizon_breakthrough_image_alt',
                  })}
                  className={styles.FeatureImage}
                  loading="lazy"
                />
              </div>
              <div
                className={`${styles.FeaturesList} ${
                  playAnimation ? styles['FeaturesList--animateIn'] : ''
                }`}
              >
                <div
                  className={`${styles['FeaturesList__Label']} ${styles['FeaturesList__Label--reverse']} ${styles['FeaturesList__Label--3']}`}
                >
                  <TOCEntry
                    icon={
                      <Icon outlined size="large">
                        <IconHRV />
                      </Icon>
                    }
                    label={t('pdp_horizon_breakthrough_accuracy_title')}
                    summary={t('pdp_horizon_breakthrough_accuracy_description')}
                  />
                </div>
                <div
                  className={`${styles['FeaturesList__Label']} ${styles['FeaturesList__Label--2']}`}
                >
                  <TOCEntry
                    icon={
                      <Icon outlined size="large">
                        <IconBattery />
                      </Icon>
                    }
                    label={t('pdp_horizon_breakthrough_battery_title')}
                    summary={t('pdp_horizon_breakthrough_battery_description')}
                  />
                </div>
                <div
                  className={`${styles['FeaturesList__Label']} ${styles['FeaturesList__Label--1']}`}
                >
                  <TOCEntry
                    icon={
                      <Icon outlined size="large">
                        <IconTemperature />
                      </Icon>
                    }
                    label={t('pdp_horizon_breakthrough_sensors_title')}
                    summary={t('pdp_horizon_breakthrough_sensors_description')}
                  />
                </div>
                <div
                  className={`${styles['FeaturesList__Label']} ${styles['FeaturesList__Label--reverse']} ${styles['FeaturesList__Label--4']}`}
                >
                  <TOCEntry
                    icon={
                      <Icon outlined size="large">
                        <IconDiamond />
                      </Icon>
                    }
                    label={t('pdp_horizon_breakthrough_design_title')}
                    summary={t('pdp_horizon_breakthrough_design_description')}
                  />
                </div>
              </div>
            </div>
          </div>
        </Waypoint>
      </Grid>
    </div>
  );
};

export default ProductBreakthrough;
