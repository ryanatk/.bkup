import { dprSrcSet } from '../../../utils/imageHelpers';
import { Grid } from '../../sormus';
import Typography from '../../sormus/Typography';
import TypographyRhythm from '../../sormus/TypographyRhythm';
import SignupForm from './SignupForm';

const Signup = () => (
  <div className="bg-white py-20 lg:py-24">
    <Grid className="items-center">
      <img
        {...dprSrcSet(`product/heritage-gold-rotated`, 'png', 650)}
        className="col-full lg:col-main lg:col-start-9"
      />
      <div className="col-main lg:row-start-1 lg:col-end-8 lg:col-start-3">
        <TypographyRhythm>
          <Typography variant="h3" color="helsinkiBlue">
            Get started with our simple sign up form.
          </Typography>
        </TypographyRhythm>
        <SignupForm />
      </div>
    </Grid>
  </div>
);

export default Signup;
