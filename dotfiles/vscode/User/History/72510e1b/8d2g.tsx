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
        <Grid className="pt-10 pb-20">
          <div
            className={cx(
              'col-main',
              'md:col-start-5 md:col-end-8',
              'lg:col-start-3 lg:col-span-6',
              'xl:col-start-3 xl:col-span-7',
              'flex flex-col justify-center',
            )}
          >
            <FsaProductSlideshow />
          </div>

          <div
            className={cx(
              'col-main ',
              'lg:col-start-9 lg:col-span-4 xl:col-start-10 xl:col-span-3 flex items-center',
            )}
          >
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
