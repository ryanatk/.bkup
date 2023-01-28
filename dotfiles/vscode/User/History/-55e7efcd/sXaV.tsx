import { ReactElement } from 'react';
import { Grid, Typography } from '../../sormus';
import { DescriptionItem } from './components';

const FsaDescription = (): ReactElement => {
  return (
    <section className="bg-helsinkiBlue-dark">
      <Grid>
        <Typography
          Element="h2"
          variant="h4"
          color="white"
          className="col-main lg:col-start-3 lg:col-end-5"
        >
          Description
        </Typography>

        <Typography
          Element="ul"
          color="white"
          className="col-main lg:col-start-6 lg:col-end-9"
        >
          <DescriptionItem title="24/7 Heart Rate">
            You can track your heart health with daytime and nighttime heart
            rate tracking, workout heart rating tracking, nighttime heart rate
            variability (HRV) tracking, and activity level monitoring (steps and
            calories).
          </DescriptionItem>
        </Typography>

        <Typography
          Element="ul"
          color="white"
          className="col-main lg:col-start-10 lg:col-end-13"
        >
          <li>list 2</li>
        </Typography>
      </Grid>
    </section>
  );
};

export default FsaDescription;
