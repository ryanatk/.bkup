// Original version of the FSA page
// This is for US only, and will not get any translations

import { ReactElement } from 'react';
import {
  FsaHeader,
  FsaProductDetails,
  FsaProductSlideshow,
} from '../../components/pages/fsa-hsa-info';
// import LegalFootnotes from '../../components/pages/_global/LegalFootnotes';
import { Grid, PageContainer, PageLayout } from '../../components/sormus';
import { details } from '../../data-mock/page-details/fsa-hsa-info';

const OriginalFsa = (): ReactElement => {
  return (
    <PageLayout
      headerProps={{
        className: 'bg-white',
      }}
      seoParams={{ ...details.seoParams }}
      Header={FsaHeader}
    >
      <PageContainer name="fsa-hsa-info" padding="none">
        <Grid>
          <div className="col-main lg:col-start-2 lg:col-end-10">
            <FsaProductSlideshow />
          </div>

          <div className="col-main lg:col-start-10 lg:col-end-13 flex items-center">
            <FsaProductDetails />
          </div>
        </Grid>

        {/* <LegalFootnotes footnotes={[]} /> */}
      </PageContainer>
    </PageLayout>
  );
};

export default OriginalFsa;
