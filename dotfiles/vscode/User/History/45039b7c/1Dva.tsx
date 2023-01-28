import React from 'react';
import tw from 'twin.macro';
import { Grid } from '../../sormus';
import { ProductAccolades } from '../_global';
import { accoladesSlides } from './data/accoladesSlides';

const Section = tw.section`
  py-5
  md:(py-12)
  lg:(pl-20)
`;

const SectionInner = tw.div`
  col-main
  md:(col-start-3 col-end-13)
`;

export const MembershipAccolades = (): JSX.Element => {
  return (
    <Section>
      <Grid>
        <SectionInner>
          <ProductAccolades
            className="p-0"
            title="membership_accolades_title"
            slides={accoladesSlides}
          />
        </SectionInner>
      </Grid>
    </Section>
  );
};

export default MembershipAccolades;
