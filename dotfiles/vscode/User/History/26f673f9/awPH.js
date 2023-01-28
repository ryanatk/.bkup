import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';

import styles from './Print.module.css';
import { Footer } from '../components';

const Print = ({ className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <main className={cx(styles.main, className)}>{children}</main>

      <Footer print />
    </div>
  );
};

Print.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default Print;
