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
          style={{ columns: 2 }}
        >
          <DescriptionItem title="24/7 Heart Rate">
            You can track your heart health with daytime and nighttime heart
            rate tracking, workout heart rating tracking, nighttime heart rate
            variability (HRV) tracking, and activity level monitoring (steps and
            calories).
          </DescriptionItem>

          <DescriptionItem title="Blood oxygen sensing (SpO2)">
            By detecting your blood oxygen levels at night, Oura can tell if
            you're experiencing any breathing disturbances that may interrupt
            your sleep.
          </DescriptionItem>

          <DescriptionItem title="Accuracy Above All">
            The Oura Ring is designed for accuracy above all because it measures
            from the palm side of your finger, where the pulse signal is
            strong—much stronger than the top of your wrist (doctors measure
            your heart rate from your finger for a reason)
          </DescriptionItem>

          <DescriptionItem title="Measure Your HRV">
            Your Sleep Score is made up of seven Sleep Contributors including
            sleep stages (deep sleep, light sleep, REM), timing, and efficiency.
          </DescriptionItem>

          <DescriptionItem title=""></DescriptionItem>

          <DescriptionItem title=""></DescriptionItem>

          <DescriptionItem title=""></DescriptionItem>

          <DescriptionItem title=""></DescriptionItem>

          <DescriptionItem title=""></DescriptionItem>
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
