import cx from 'classnames';

import styles from './Scrollbar.module.css';

const Scrollbar = ({ className, children, ...rest }) => {
  return (
    <div className={cx(styles.scrollbar, className)} {...rest}>
      {children}
    </div>
  );
};

export default Scrollbar;
