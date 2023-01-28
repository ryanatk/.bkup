import { node, oneOf, string } from 'prop-types';
import cx from 'classnames';

import { ROUTE } from 'common/const';

import { Footer, Header } from '../components';

import styles from './CenteredPage.module.css';

const CenteredPage = ({ backTo, className, children }) => {
  return (
    <>
      <Header backTo={backTo} />

      <div className={styles.page}>
        <main className={cx(styles.main, className)}>{children}</main>

        {backTo && <Footer className={styles.footer} />}
      </div>
    </>
  );
};

CenteredPage.propTypes = {
  backTo: oneOf(Object.values(ROUTE)),
  className: string,
  children: node,
};

export default CenteredPage;
