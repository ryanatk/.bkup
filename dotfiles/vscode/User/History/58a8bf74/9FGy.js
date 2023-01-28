import { useEffect, useState } from 'react';
import { bool, string } from 'prop-types';
import cx from 'classnames';
import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/system';

import { useChat, useOrders } from 'app/context';
import { BACKGROUND, COLOR, ROUTE } from 'common/const';
import { IconButton } from 'common/components';

import Logo from '../Logo';
import UserNav from '../UserNav';
import Footer from '../Footer';
import Drawer from '../Drawer';

import styles from './Header.module.css';

const Header = ({ backTo, children }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { header } = useTheme();
  const { cover, uncover } = useChat();
  const { refetch, STATUS } = useOrders();

  useEffect(() => {
    const toggle = isUserMenuOpen ? cover : uncover;
    toggle('header');
  }, [isUserMenuOpen, cover, uncover]);

  return (
    <div>
      <AppBar
        position="sticky"
        color="transparent"
        sx={
          {
            // zIndex: 'header',
          }
        }
      >
        <Toolbar
          className={cx(BACKGROUND.HEADER, COLOR.HEADER, styles.toolbar)}
        >
          {backTo ? (
            <IconButton
              icon="close"
              to={backTo}
              onClick={() => refetch(STATUS.INCOMPLETE)}
              edge="start"
              color="inherit"
              aria-label="Go Back"
            />
          ) : (
            <IconButton
              icon="menu"
              onClick={() => setIsUserMenuOpen((prevOpen) => !prevOpen)}
              edge="start"
              color="inherit"
              aria-label="Main Navigation"
            />
          )}

          <div className={styles.logo}>
            <Logo name={header?.logo} to={ROUTE.HOME} />
          </div>

          <div className={styles.children}>{children}</div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        close={() => setIsUserMenuOpen(false)}
        hasCloseButton={false}
        isOpen={isUserMenuOpen}
        open={() => setIsUserMenuOpen(true)}
      >
        <div className={styles.drawer}>
          <UserNav close={() => setIsUserMenuOpen(false)} />

          <div className={styles.footer}>
            <Footer stacked />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

Header.propTypes = {
  backTo: string,
};

export default Header;
