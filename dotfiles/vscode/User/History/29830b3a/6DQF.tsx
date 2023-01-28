import { srcSet } from '../../../utils/imageHelpers';
import { Grid, Typography } from '../../sormus';

const FsaResearch = (): JSX.Element => (
  <div className="py-10 md:py-32">
    <Grid>
      <div className="col-main lg:col-start-3 lg:col-end-12">
        <Typography variant="h3" Element="h3">
          The Oura Ring has been used in independent studies at UCSF, UC San
          Diego, MIT Lincoln Laboratory, the US Army, and the US Navy - with
          more already in the works.
        </Typography>
      </div>
    </Grid>

    <Grid className="mt-12 lg:mt-16">
      <div className="col-main lg:col-start-6 lg:col-end-9">
        <img
          {...srcSet('meet-the-community/logo-UCSD@2x', 'png', [300, 600])}
          className="w-auto h-16"
          alt="UC San Diego"
          loading="lazy"
          width="330"
          height="50"
        />

        <Typography className="mb-4">
          University of California, San Diego is using Oura Ring to look for
          patterns in heart rate and heart rate variability (HRV), combined with
          other vitals that may help identify the onset of pregnancy and/or help
          predict different pregnancy outcomes and progressions.
        </Typography>
      </div>

      <div className="col-main lg:col-start-10 lg:col-end-13">
        <img
          {...srcSet('meet-the-community/logo-WVU@2x', 'png', [300, 600])}
          className="w-auto h-16"
          alt="West Virginia University"
          loading="lazy"
          width="330"
          height="50"
        />

        <Typography className="mb-4">
          A team of researchers at West Virginia University published a new
          study on the accuracy of consumer tools at measuring heart rate and
          HRV. The infrared photoplethysmogram (PPG) sensor in the Oura Ring
          nearly matched performance with clinical-grade ECG and consistently
          outperformed other PPG tools.
        </Typography>
      </div>
    </Grid>
  </div>
);

export default FsaResearch;
