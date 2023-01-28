import Link from 'next/link';
import { VectorImage } from '../../sormus';

const FsaHeader = () => {
  return (
    <Link href="/" passHref>
      <a
        href="/"
        className={styles.logo}
        data-cy="nav_logo_link"
        id="nav_home"
        aria-label="Oura home"
      >
        <VectorImage color="inherit" name="oura" maxWidth={100} />
      </a>
    </Link>
  );
};

export default FsaHeader;
