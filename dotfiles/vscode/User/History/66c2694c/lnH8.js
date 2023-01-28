import { useLocation } from 'react-router-dom';

import { Page } from 'common/site';
import { track } from 'common/utils';

import styles from './NotFound.module.css';
import { useEffect } from 'react';

// TODO: make this better (need design)
const NotFound = () => {
  const location = useLocation();

  useEffect(() => track(['404 page', location, document.referrer]), []);

  return (
    <Page className={styles.page} title="404: Not Found">
      404: Not Found
    </Page>
  );
};

export default NotFound;
