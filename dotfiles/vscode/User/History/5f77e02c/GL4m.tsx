import Link from 'next/link';
import { ReactElement } from 'react';
import { Grid, VectorImage } from '../../sormus';

const FsaHeader = (): ReactElement => {
  return (
    <Grid className="p-4 lg:p-6 border-b border-gray-100 lg:border-0">
      <div className="col-main lg:col-start-3 flex justify-center lg:justify-start">
        <Link href="/business" passHref>
          <a
            href="/"
            className="w-16 md:w-24"
            data-cy="nav_logo_link"
            id="nav_home"
            aria-label="Oura home"
          >
            <VectorImage color="inherit" name="oura" maxWidth={100} />
          </a>
        </Link>
      </div>
    </Grid>
  );
};

export default FsaHeader;
