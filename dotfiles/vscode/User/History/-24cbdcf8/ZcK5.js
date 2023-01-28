import { useLocation } from 'react-router';
import { Divider, List, ListSubheader } from '@mui/material';

import { ROUTE } from 'common/const';
import { ListItem, Scrollbar } from 'common/components';

import styles from './AccountNav.module.css';

const AccountNav = () => {
  const { pathname } = useLocation();

  return (
    <Scrollbar className={styles.wrap}>
      <List>
        <ListItem
          icon="receipt"
          text="My Orders"
          to={ROUTE.ORDERS}
          active={pathname === ROUTE.ORDERS}
        />
      </List>

      <Divider />

      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem
          icon="person"
          text="Account"
          to={ROUTE.ACCOUNT}
          active={pathname === ROUTE.ACCOUNT}
        />
        {/* N/A for initial launch, but COMING SOON */}
        {/* <ListItem
            icon="bell"
            text="Notifications"
            to={ROUTE.NOTIFICATIONS}
            active={pathname === ROUTE.NOTIFICATIONS}
          /> */}
      </List>
    </Scrollbar>
  );
};

export default AccountNav;
