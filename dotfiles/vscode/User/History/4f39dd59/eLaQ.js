import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';
import { Scrollbar } from 'common/components';

import { Header, Footer } from '../components';
import styles from './OrderPage.module.css';

const OrderPage = ({ backTo, className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <Header backTo={backTo} />

      <Scrollbar className={styles.content}>
        <main className={cx(styles.main, className)}>{children}</main>

        {backTo && <Footer className={styles.footer} />}
      </Scrollbar>
    </div>
  );
};

OrderPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default OrderPage;
