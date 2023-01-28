// Original version of the FSA page
// This is for US only, and will not get any translations

import cx from 'classnames';
import { ReactElement } from 'react';
import {
  FsaDescription,
  FsaFootnotes,
  FsaHeader,
  FsaProductDetails,
  FsaProductSlideshow,
  FsaResearch,
} from '../../components/pages/fsa-hsa-info';
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
          <div
            className={cx(
              'col-main lg:col-start-2 lg:col-end-10',
              'pb-20 lg:pt-10',
            )}
          >
            <FsaProductSlideshow />
          </div>

          <div className="col-main lg:col-start-10 lg:col-end-13 flex items-center">
            <FsaProductDetails />
          </div>
        </Grid>

        <FsaDescription />
        <FsaResearch />

        <FsaFootnotes />
      </PageContainer>
    </PageLayout>
  );
};

export default OriginalFsa;
