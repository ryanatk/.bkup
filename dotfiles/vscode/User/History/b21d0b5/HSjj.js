import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';
import { Scrollbar } from 'common/components';

import { Footer, Header } from '../components';

import styles from './CenteredPage.module.css';

const CenteredPage = ({ backTo, className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <div className={cx(styles.header)}>
        <Header backTo={backTo} />
      </div>

      <Scrollbar className={cx(styles.scrollbar)}>
        <main className={cx(styles.main, className)}>{children}</main>

        {backTo && <Footer className={styles.footer} />}
      </Scrollbar>
    </div>
  );
};

CenteredPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default CenteredPage;
