import { useEffect, useState } from 'react';
import { any, string } from 'prop-types';
import { useLocation } from 'react-router';
import cx from 'classnames';
import { Backdrop, Box, Paper as MuiPaper } from '@mui/material';

import { useChat } from 'app/context';
import { BACKGROUND, BORDER, TEXT } from 'common/const';
import { Icon, Scrollbar, TextLink } from 'common/components';

import useHeaderHeight from '../useHeaderHeight';

import styles from './Sidebar.module.css';

const CONTENT_ID = 'responsive-nav-content';

// toggle body overflow
const updateBody = (isOpen) => {
  const BODY_CLASS = 'nav-open'; // app/styles/global.css

  return isOpen
    ? document.body.classList.add(BODY_CLASS)
    : document.body.classList.remove(BODY_CLASS);
};

const Sidebar = ({ className, label = 'Menu', children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cover, uncover } = useChat();
  const headerHeight = useHeaderHeight();

  // handle ESC key
  useEffect(() => {
    const escFunction = (event) =>
      event.key === 'Escape' ? setIsOpen(false) : null;

    if (isOpen) {
      document.addEventListener('keydown', escFunction);
    } else {
      document.removeEventListener('keydown', escFunction);
    }

    return () => document.removeEventListener('keydown', escFunction);
  }, [isOpen]);

  // close when url changes
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location]);

  // toggle body overflow
  useEffect(() => {
    updateBody(isOpen);

    // reset overflow, on unmount
    return () => updateBody();
  }, [isOpen, cover, uncover]);

  // handle chat cover/uncover
  useEffect(() => {
    const toggle = isOpen ? cover : uncover;
    toggle('responsive-nav');
  }, [isOpen, cover, uncover]);

  const Paper = ({ component: Component, children, ...props }) => (
    <Component {...props}>
      <MuiPaper
        className={cx(BACKGROUND.PAPER, styles.paper)}
        elevation={3}
        square
      >
        {children}
      </MuiPaper>
    </Component>
  );

  return (
    <>
      <Box
        className={cx(styles.wrap, className)}
        sx={{ zIndex: 'appBar' }} /* for mobile */
        style={{ top: headerHeight }}
        component="section"
      >
        {/* mobile heading */}
        <Paper component="h6" className={cx(BORDER.GREY_100, styles.heading)}>
          <TextLink
            aria-controls={CONTENT_ID}
            aria-expanded={isOpen}
            className={cx(styles.trigger)}
            color="inherit"
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
            }}
          >
            <span className={cx(TEXT.SUBTITLE_2)}>{label}</span>
            <Icon name={isOpen ? 'caret-up' : 'caret-down'} size="medium" />
          </TextLink>
        </Paper>

        {/* content */}
        <Paper
          component="nav"
          id={CONTENT_ID}
          aria-label={`${label} Navigation`}
          className={cx(styles.content, {
            [styles.open]: isOpen,
          })}
        >
          <Scrollbar className={styles.sidebar}>{children}</Scrollbar>
        </Paper>
      </Box>

      {/* backdrop */}
      <Backdrop
        className={styles.backdrop}
        open={isOpen}
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

Sidebar.propTypes = {
  label: string,
  children: any,
};

export default Sidebar;
