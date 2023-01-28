import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';

import { Header, Footer } from '../components';
import styles from './OrderPage.module.css';

const OrderPage = ({ backTo, className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <Header backTo={backTo} />

      <main className={cx(styles.main, className)}>{children}</main>

      {backTo && <Footer className={styles.footer} />}
    </div>
  );
};

OrderPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default OrderPage;
