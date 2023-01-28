import { Typography, TypographyRhythm } from '../../../sormus';

const Slide = ({ title, paragraphs }) => (
  <TypographyRhythm>
    <Typography Element="h3" variant="h6" color="inherit" weight="normal">
      {t('meet_oura_ring_body_temperature')}
    </Typography>
    <Typography color="inherit">
      {t('pdp_body_temperature_paragraph_1')}
    </Typography>
    <Typography color="inherit">
      {t('pdp_body_temperature_paragraph_2')}
    </Typography>
  </TypographyRhythm>
);

export default Slide;
