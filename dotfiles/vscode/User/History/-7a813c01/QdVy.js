import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';
import { Button } from 'common/components';

import { Header, Footer } from '../components';
import styles from './BuilderPage.module.css';

const BuilderPage = ({ backTo, className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <Header backTo={backTo} className={styles.header}>
        <div className={styles.header}>
          {/* TODO: buttons */}
          <Button color="inherit" text>
            Save
          </Button>
        </div>
      </Header>

      <main className={cx(styles.main, className)}>{children}</main>
    </div>
  );
};

BuilderPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default BuilderPage;
