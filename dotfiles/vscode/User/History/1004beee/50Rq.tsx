import { t } from '../../../public/locales/LocaleContext';
import { Typography, TypographyRhythm } from '../../sormus';

const ProductSizingModal = (): JSX.Element => (
  <>
    <TypographyRhythm>
      <Typography variant="h3">
        {t('pdp_horizon_sizing_modal_title')}
      </Typography>
      <Typography variant="h6" weight="medium">
        {t('pdp_horizon_sizing_modal_subtitle')}
      </Typography>
    </TypographyRhythm>
    <TypographyRhythm>
      <Typography variant="h6" weight="medium" className="mt-12">
        {t('pdp_horizon_sizing_modal_expect')}
      </Typography>

      <Typography variant="body2" color="burntOrange">
        {t('pdp_horizon_sizing_modal_step_1_title')}
      </Typography>

      <Typography>
        {t('pdp_horizon_sizing_modal_step_1_description')}
      </Typography>

      <Typography variant="body2" color="burntOrange">
        {t('pdp_horizon_sizing_modal_step_2_title')}
      </Typography>

      <Typography>
        {t('pdp_horizon_sizing_modal_step_2_description')}
      </Typography>

      <Typography variant="body2" color="burntOrange">
        {t('pdp_horizon_sizing_modal_step_3_title')}
      </Typography>

      <Typography>
        {t('pdp_horizon_sizing_modal_step_3_description')}
      </Typography>

      <Typography>
        {t('pdp_horizon_sizing_modal_therabody', {
          learnMore: (
            <a
              href="https://www.therabody.com/us/en-us/stores"
              target="_blank"
              // rel="noreferrer"
            >
              {t('pdp_horizon_sizing_modal_therabody')}
            </a>
          ),
        })}
      </Typography>
    </TypographyRhythm>
  </>
);

export default ProductSizingModal;
