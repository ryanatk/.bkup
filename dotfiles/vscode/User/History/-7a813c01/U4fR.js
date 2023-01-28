import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';

import { Header, Footer } from '../components';
import styles from './BuilderPage.module.css';
import { Button } from 'common/components';

const BuilderPage = ({ backTo, className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <Header backTo={backTo} className={styles.header}>
        <Button color="inherit">Save</Button>
      </Header>

      <main className={cx(styles.main, className)}>{children}</main>

      {backTo && <Footer className={styles.footer} />}
    </div>
  );
};

BuilderPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default BuilderPage;
