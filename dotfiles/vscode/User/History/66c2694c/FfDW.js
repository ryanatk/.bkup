import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Page } from 'common/site';
import { track } from 'common/utils';

import styles from './NotFound.module.css';

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => track(['404 page', pathname, document.referrer]), [pathname]);

  return (
    <Page className={styles.page} title="404: Not Found">
      404: Not Found
    </Page>
  );
};

export default NotFound;
