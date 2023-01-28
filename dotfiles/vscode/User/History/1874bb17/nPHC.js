import { any, string } from 'prop-types';
import cx from 'classnames';

import styles from './Scrollbar.module.css';

const Scrollbar = ({ component: El = 'div', className, children, ...rest }) => {
  return (
    <El className={cx(styles.scrollbar, className)} {...rest}>
      {children}
    </El>
  );
};

Scrollbar.propTypes = {
  component: string,
  className: string,
  children: any,
};

export default Scrollbar;
