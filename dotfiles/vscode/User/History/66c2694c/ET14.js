import { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { ROUTE } from 'common/const';
import { Page } from 'common/site';
import { track } from 'common/utils';

import REDIRECTS from './redirects';

import styles from './NotFound.module.css';

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(
    () =>
      track([
        '404 page',
        pathname,
        document.referrer,
        REDIRECTS.includes(pathname),
      ]),
    [pathname],
  );

  return (
    <Page className={styles.page} title="404: Not Found">
      <Route exact path={REDIRECTS}>
        this should redirect
        <Redirect to={ROUTE.HOME} />
      </Route>
      <p>404: Not Found</p>
    </Page>
  );
};

export default NotFound;
