import { t } from '../../../public/locales/LocaleContext';
import { Grid, List, ListItem, Typography } from '../../sormus';

const ProductSpecs = () => (
  <div className="bg-helsinkiBlue-dark py-24">
    <Grid>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-end-5 lg:row-start-1">
        <Typography variant="h4" Element="h3" color="white">
          {t('tech_specs')}
        </Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('meet_oura_ring_materials')}
        </Typography>
        <List type="ul">
          <ListItem color="white">
            {t('meet_oura_ring_durable_titanium')}
          </ListItem>
          <ListItem color="white">{t('meet_oura_ring_pvd_coating')}</ListItem>
          <ListItem color="white">
            {t('meet_oura_ring_non_allergenic')}
          </ListItem>
          <ListItem color="white">{t('water_resistant_depth')}</ListItem>
        </List>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-8">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('meet_oura_ring_battery_and_power')}
        </Typography>
        <List type="ul">
          <ListItem color="white">{t('bilbo_battery_life')}</ListItem>
          <ListItem color="white">{t('meet_oura_ring_full_charge')}</ListItem>
        </List>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-1">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('meet_oura_ring_weight_dimessions')}
        </Typography>
        <List type="ul">
          <ListItem color="white">{t('meet_oura_ring_width')}</ListItem>
          <ListItem color="white">{t('meet_oura_ring_thickness')}</ListItem>
          <ListItem color="white">{t('meet_oura_ring_weight')}</ListItem>
        </List>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('meet_oura_ring_connectivity')}
        </Typography>
        <List type="ul">
          <ListItem color="white">{t('meet_oura_ring_bluetooth')}</ListItem>
          <ListItem color="white">{t('automatic_firmware_updates')}</ListItem>
          <ListItem color="white">{t('meet_oura_ring_emf_safe')}</ListItem>
        </List>
      </div>
    </Grid>

    <Grid>
      {/* to keep aligment with the rest of the grid */}
      <hr className="col-main md:col-start-3 md:col-end-13 border-grayscale-dark lg:row-start-3 my-8" />
    </Grid>

    <Grid>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-end-5 lg:row-start-4">
        <Typography variant="h4" Element="h3" color="white">
          {t('all_features')}
        </Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-4">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('sleep_activity_and_readiness_title')}
        </Typography>
        <Typography color="white">
          {t('sleep_activity_and_readiness_body')}
        </Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-5">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('workout_heartrate_insights_title')}
          <sup>
            <a href="#legal-footnotes">1</a>
          </sup>
        </Typography>
        <Typography color="white">
          {t('workout_heartrate_insights_body')}
        </Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-6">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('rest_mode')}
        </Typography>
        <Typography color="white">{t('rest_mode_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-7">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('automatic_nap_detection_title')}
        </Typography>
        <Typography color="white">
          {t('automatic_nap_detection_body')}
        </Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-8">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('trends')}
        </Typography>
        <Typography color="white">{t('trends_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-9">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('tags')}
        </Typography>
        <Typography color="white">{t('tags_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9 lg:row-start-10">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('spo2_sensing')}
          <sup>
            <a href="#legal-footnotes">2</a>
          </sup>
        </Typography>
        <Typography color="white">{t('spo2_sensing_body')}</Typography>
      </div>

      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-4">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('247_heart_rate')}
        </Typography>
        <Typography color="white">{t('247_heart_rate_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-5">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('restorative_time')}
        </Typography>
        <Typography color="white">{t('restorative_time_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-6">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('period_prediction')}
        </Typography>
        <Typography color="white">{t('period_predicition_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-7">
        <Typography variant="eyebrow" color="success">
          {t('new')}
        </Typography>
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('guided_audio_sessions')}
        </Typography>
        <Typography color="white">{t('guided_audio_sessions_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-8">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('oura_stickers')}
        </Typography>
        <Typography color="white">{t('oura_stickers_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-9">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('activity_levels')}
        </Typography>
        <Typography color="white">{t('activity_levels_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-10">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('bedtime_guidance')}
        </Typography>
        <Typography color="white">{t('bedtime_guidance_body')}</Typography>
      </div>
      <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:row-start-11">
        <Typography variant="h6" Element="h4" color="white" className="mb-4">
          {t('product_specs_apple_google_health_title')}
        </Typography>
        <Typography color="white">
          {t('product_specs_apple_google_health_body')}
        </Typography>
      </div>
    </Grid>
  </div>
);

export default ProductSpecs;
