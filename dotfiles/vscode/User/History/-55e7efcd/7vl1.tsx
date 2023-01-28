import { ReactElement } from 'react';
import { Grid, Typography } from '../../sormus';

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
          <li>list 1</li>
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
