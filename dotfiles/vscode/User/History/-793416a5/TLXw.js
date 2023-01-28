import { node } from 'prop-types';
import cx from 'classnames';

import { Scrollbar } from 'common/components';

import { Header } from '../components';
import AccountNav from './AccountNav';

import styles from './AccountPage.module.css';

const AccountPage = ({ className, children }) => {
  return (
    <div className={cx(styles.page)}>
      <Header />

      <Scrollbar>
        <main className={cx(styles.main)}>
          <div className={styles.nav}>
            <AccountNav />
          </div>

          <div className={cx(styles.content, className)}>{children}</div>
        </main>
      </Scrollbar>

      {/* No Footer (it's in the UserMenu) */}
    </div>
  );
};

AccountPage.propTypes = {
  children: node,
};

export default AccountPage;
