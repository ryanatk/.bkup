import { t } from '../../../../public/locales/LocaleContext';
import IconDiamond from '../../../../svg/design-tokens/icon_diamond.svg';
import IconMoment from '../../../../svg/design-tokens/icon_moment.svg';
import IconRingBattery from '../../../../svg/design-tokens/icon_ring_battery.svg';
import IconWater from '../../../../svg/design-tokens/icon_soundscape_wave_motion.svg';
import IconMobileFriendly from '../../../../svg/icon_mobile_friendly.svg';
import { Grid, TOC, TOCEntry, Typography } from '../../../sormus';
import Icon from '../../../sormus/Icon';

const ProductLifestyle = () => (
  <Grid>
    <div className="col-main md:col-start-3 md:col-end-13 mb-24 text-helsinkiBlue">
      <Typography variant="h2" element="h2" className="mb-20">
        {t('keeps_pace_with_your_life')}
      </Typography>
      <TOC
        entries={[
          <TOCEntry
            label={t('pdp_highlights_titanium_body')}
            icon={
              <Icon>
                <IconMoment />
              </Icon>
            }
            key="pl-toc-pdp_highlights_titanium_body"
          />,
          <TOCEntry
            label={t('bilbo_battery_life')}
            icon={
              <Icon>
                <IconRingBattery />
              </Icon>
            }
            key="pl-toc-bilbo_battery_life"
          />,
          <TOCEntry
            label={t('app_available_on')}
            icon={
              <Icon>
                <IconMobileFriendly />
              </Icon>
            }
            key="pl-toc-app_available_on"
          />,
          <TOCEntry
            label={t('water_resistant_depth')}
            icon={
              <Icon>
                <IconWater />
              </Icon>
            }
            key="pl-toc-water_resistant_depth"
          />,
          <TOCEntry
            label={t('lightweight_titanium_durable')}
            icon={
              <Icon>
                <IconDiamond />
              </Icon>
            }
            key="pl-toc-lightweight_titanium_durable"
          />,
        ]}
      />
    </div>
  </Grid>
);

export default ProductLifestyle;
