import { Divider, List } from '@mui/material';
import cx from 'classnames';

import { useAuth, useCustomer } from 'app/context';
import { ROUTE, TEXT } from 'common/const';
import { ListItem, TextLink } from 'common/components';

import styles from './UserNav.module.css';

const UserNav = ({ close }) => {
  const Item = (props) => <ListItem onClick={close} {...props} />;
  const { logout } = useAuth();
  const { displayName: customerName } = useCustomer();

  return (
    <nav aria-label="User Menu" className={styles.nav}>
      <p className={cx(TEXT.H6, styles.name)}>{customerName}</p>

      <div className={styles.settings}>
        <TextLink className={TEXT.SUBTITLE} to={ROUTE.ACCOUNT}>
          My Account
        </TextLink>
      </div>

      <List>
        <Divider />

        <Item icon="home" text="Dashboard" to={ROUTE.DASHBOARD} />
        <Item icon="receipt" text="My Orders" to={ROUTE.ORDERS} />

        <Divider />

        <Item icon="logout" text="Log Out" onClick={logout} to={ROUTE.LOGIN} />
      </List>
    </nav>
  );
};

export default UserNav;
