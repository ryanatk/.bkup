import { ReactElement } from 'react';
import { Grid } from '../../sormus';

const FsaDescription = (): ReactElement => {
  return (
    <section className="bg-helsinkiBlue-dark">
      <Grid>
        <Typography Element="h2" variant="h4">
          Description
        </Typography>
      </Grid>
    </section>
  );
};

export default FsaDescription;
