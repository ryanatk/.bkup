import { ReactElement } from 'react';
import { Grid, Typography } from '../../sormus';

const FsaDescription = (): ReactElement => {
  return (
    <section className="bg-helsinkiBlue-dark">
      <Grid>
        <Typography
          Element="h2"
          variant="h4"
          className="col-main lg:col-start-3 lg:col-end-5"
        >
          Description
        </Typography>
      </Grid>
    </section>
  );
};

export default FsaDescription;
