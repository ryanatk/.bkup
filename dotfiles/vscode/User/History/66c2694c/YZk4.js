import { Page } from 'common/site';

import styles from './NotFound.module.css';

// TODO: make this better (need design)
const NotFound = () => {
  return (
    <Page className={styles.page} title="404: Not Found">
      404: Not Found
    </Page>
  );
};

export default NotFound;
