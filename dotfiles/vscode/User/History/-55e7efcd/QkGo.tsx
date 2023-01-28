import { ReactElement } from 'react';
import { Grid, Typography } from '../../sormus';
import { DescriptionItem } from './components';

const FsaDescription = (): ReactElement => {
  return (
    <section className="bg-helsinkiBlue-dark py-20 lg:py-24">
      <Grid>
        <Typography
          Element="h2"
          variant="h4"
          color="white"
          className="col-main lg:col-start-3 lg:col-end-5 mb-10"
        >
          Description
        </Typography>

        <Typography
          Element="ul"
          color="white"
          className="col-main md:row-start-2 md:col-start-2 md:col-end-7 lg:row-start-1 lg:col-start-6 lg:col-end-9"
        >
          <DescriptionItem icon="hrv" title="24/7 Heart Rate">
            You can track your heart health with daytime and nighttime heart
            rate tracking, workout heart rating tracking, nighttime heart rate
            variability (HRV) tracking, and activity level monitoring (steps and
            calories).
          </DescriptionItem>

          <DescriptionItem icon="lungs" title="Blood oxygen sensing (SpO2)">
            By detecting your blood oxygen levels at night, Oura can tell if
            you&apos;re experiencing any breathing disturbances that may
            interrupt your sleep.
          </DescriptionItem>

          <DescriptionItem icon="target" title="Accuracy Above All">
            The Oura Ring is designed for accuracy above all because it measures
            from the palm side of your finger, where the pulse signal is
            strong—much stronger than the top of your wrist (doctors measure
            your heart rate from your finger for a reason)
          </DescriptionItem>

          <DescriptionItem icon="zzz" title="Measure Your HRV">
            Your Sleep Score is made up of seven Sleep Contributors including
            sleep stages (deep sleep, light sleep, REM), timing, and efficiency.
          </DescriptionItem>
        </Typography>

        <Typography
          Element="ul"
          color="white"
          className="col-main md:row-start-2 md:col-start-8 md:col-end-13 lg:row-start-1 lg:col-start-10 lg:col-end-13"
        >
          <DescriptionItem icon="heart" title="Health Stats">
            Oura Ring records heart health stats, including heart rate and HRV,
            as well as overnight blood oxygen and breathing rate.
          </DescriptionItem>

          <DescriptionItem icon="score" title="Lightweight Titanium">
            Durable and lightweight titanium ring design for comfort and
            accuracy. Hypoallergenic, non-metallic, seamless inner molding.
            Water resistant up to 100m/328 ft.
          </DescriptionItem>

          <DescriptionItem icon="trends" title="Trends">
            Oura Ring provides key health metrics and trends in graphs and
            reports via the Oura mobile app to help you understand how to track
            and improve your health metrics. You can download your data to share
            with your physician, trainer, caregiver, or family member.
          </DescriptionItem>

          <DescriptionItem icon="succulent" title="Control Your Health">
            Prevalent conditions such as hypertension (high blood pressure),
            hypercholesterolemia (high cholesterol), diabetes, and many other
            medical conditions require frequent monitoring of your heart. Oura
            Ring can be a valuable tool for tracking your trends in between
            doctor visits, allowing you to actively participate in improving
            your own health.<a href="#footnotes">**</a>
          </DescriptionItem>
        </Typography>
      </Grid>
    </section>
  );
};

export default FsaDescription;
