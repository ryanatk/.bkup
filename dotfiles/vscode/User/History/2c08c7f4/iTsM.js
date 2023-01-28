import { bool, func, node, oneOf, string } from 'prop-types';
import cx from 'classnames';
import { SwipeableDrawer as MuiDrawer } from '@mui/material';

import { TEXT } from 'common/const';

import styles from './Drawer.module.css';
import { IconButton } from 'common/components';

const Drawer = ({
  anchor,
  close,
  hasCloseButton = true,
  hasResponsiveNav,
  isOpen,
  open,
  title,
  children,
}) => {
  // console.log('<Drawer>', { anchor, hasCloseButton, isOpen, title });

  const handleClose = (evt) => {
    // ignore some events
    if (evt && evt.type === 'keydown' && ['Tab', 'Shift'].includes(evt.key)) {
      return;
    }

    close();
  };

  return (
    <MuiDrawer
      anchor={anchor}
      open={isOpen}
      onClose={handleClose}
      onOpen={open}
      disableDiscovery={true}
      disableSwipeToOpen={true}
    >
      {(title || hasCloseButton) && (
        <div className={cx(styles.header, styles[anchor])}>
          {title && <h5 className={cx(TEXT.H6, styles.title)}>{title}</h5>}
          {hasCloseButton && (
            <IconButton
              size="small"
              icon="close"
              aria-label={`close ${title}`}
              className={styles.close}
              onClick={handleClose}
            />
          )}
        </div>
      )}
      {children}
    </MuiDrawer>
  );
};

Drawer.propTypes = {
  anchor: oneOf(['bottom', 'left', 'right', 'top']).isRequired,
  close: func.isRequired,
  hasCloseButton: bool,
  hasResponsiveNav: bool,
  isOpen: bool,
  open: func.isRequired,
  title: string,
  children: node,
};

export default Drawer;
