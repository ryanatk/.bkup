import { srcSet } from '../../../utils/imageHelpers';
import { Grid, Typography } from '../../sormus';

const FsaResearch = (): JSX.Element => (
  <Grid className="gap-y-10 py-20 lg:py-24">
    <div className="col-main md:col-start-3 md:col-end-13">
      <Typography variant="h3" Element="h3" color="grayMedium">
        The Oura Ring has been used in independent studies at UCSF, UC San
        Diego, MIT Lincoln Laboratory, the US Army, and the US Navy - with more
        already in the works.
      </Typography>
    </div>

    <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-6 lg:col-end-9">
      <img
        {...srcSet('meet-the-community/logo-UCSD@2x', 'png', [300, 600])}
        className="w-auto h-16 mb-4"
        alt="UC San Diego"
        loading="lazy"
        width="330"
        height="50"
      />

      <Typography color="grayscale-text">
        University of California, San Diego is using Oura Ring to look for
        patterns in heart rate and heart rate variability (HRV), combined with
        other vitals that may help identify the onset of pregnancy and/or help
        predict different pregnancy outcomes and progressions.
      </Typography>
    </div>

    <div className="col-main md:col-start-3 md:col-end-13 lg:col-start-10 lg:col-end-13">
      <img
        {...srcSet('meet-the-community/logo-WVU@2x', 'png', [300, 600])}
        className="w-auto h-16 mb-4"
        alt="West Virginia University"
        loading="lazy"
        width="330"
        height="50"
      />

      <Typography color="grayscale-text">
        A team of researchers at West Virginia University published a new study
        on the accuracy of consumer tools at measuring heart rate and HRV. The
        infrared photoplethysmogram (PPG) sensor in the Oura Ring nearly matched
        performance with clinical-grade ECG and consistently outperformed other
        PPG tools.
      </Typography>
    </div>
  </Grid>
);

export default FsaResearch;
