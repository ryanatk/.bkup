import { node } from 'prop-types';
import cx from 'classnames';

import { Header, Sidebar } from '../components';
import AccountNav from './AccountNav';

import styles from './AccountPage.module.css';

const AccountPage = ({ className, children }) => {
  return (
    <>
      <Header />

      <main className={cx(styles.main)}>
        <Sidebar label="Account Menu" className={styles.sidebar}>
          <AccountNav />
        </Sidebar>

        <div className={cx(styles.content, className)}>{children}</div>
      </main>

      {/* No Footer (it's in the UserMenu) */}
    </>
  );
};

AccountPage.propTypes = {
  children: node,
};

export default AccountPage;
