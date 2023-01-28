import { Suspense, useMemo } from 'react';
import { any, bool, func } from 'prop-types';

import { Error, Loading, Alert } from 'common/components';

import styles from './Content.module.css';

const Content = ({
  error,
  notification,
  isLoading,
  waitFor = () => true,
  size = 'grow',
  children,
}) => {
  // console.log('<Content>', { error, isLoading }, waitFor());

  const isWaiting = useMemo(() => {
    // it is done when "wait for" returns true (or there is an error)
    const isDone = waitFor() || error;
    return !isDone;
  }, [waitFor, error]);

  const Spinner = () =>
      <div className={styles.wrap}>
        <Loading size={size} />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className={styles.wrap}>
          <Loading size={size} />
        </div>
      }
    >
  {(isLoading || isWaiting) ? <Spinner /> : <>
      {error && (
        <div className={styles.error}>
          <Error>{error}</Error>
        </div>
      )}
      {notification && (
        <div className={styles.alert}>
          <Alert>{notification}</Alert>
        </div>
      )}
      {children}
  </>
    </Suspense>
  );
};

Content.propTypes = {
  error: any,
  notification: any,
  isLoading: bool,
  waitFor: func,
  children: any,
};

export default Content;
