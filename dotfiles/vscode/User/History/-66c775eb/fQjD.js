import { any, bool, func, number, oneOf, shape, string } from 'prop-types';
import cx from 'classnames';
import { Alert, Paper, Snackbar } from '@mui/material';

import { IconButton } from 'common/components';

import styles from './Toast.module.css';

export const HORIZONTAL_ANCHORS = ['left', 'center', 'right'];
export const VERTICAL_ANCHORS = ['top', 'bottom'];
export const DEFAULT_ANCHOR = { horizontal: 'left', vertical: 'bottom' };
export const ALERTS = ['error', 'warning', 'success'];

const Toast = ({
  alert,
  anchor,
  className,
  clickAway,
  close = () => null,
  closeButton = 'close',
  elevation = 6,
  isOpen,
  showDuration = 3, // in seconds
  children,
}) => {
  // console.log('<Toast>', { isOpen });

  const anchorOrigin = Object.assign({}, DEFAULT_ANCHOR, anchor);
  console.log({ anchorOrigin });

  const { Component, showClose, wrapClass, ...props } = Boolean(alert)
    ? {
        Component: Alert,
        severity: alert,
        onClose: closeButton ? close : undefined, // shows alert's close button
        showClose: false, // cannot change the close button for alerts
      }
    : {
        Component: Paper,
        wrapClass: cx(styles.plain),
        showClose: Boolean(closeButton),
      };

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={isOpen}
      onClose={(event, reason) => {
        switch (reason) {
          case 'clickaway':
            return clickAway ? close() : null;
          default:
            return close();
        }
      }}
      autoHideDuration={showDuration ? showDuration * 1000 : undefined}
    >
      <Component
        className={cx(className, { [styles.top]: anchor.vertical === 'top' })}
        elevation={elevation}
        {...props}
      >
        <div
          className={cx(
            styles.wrap,
            { [styles.closable]: showClose },
            wrapClass,
          )}
        >
          <span className={styles.content}>{children}</span>

          {showClose && (
            <span className={styles.close}>
              <IconButton
                onClick={close}
                icon={closeButton}
                aria-label="Close Toast"
              />
            </span>
          )}
        </div>
      </Component>
    </Snackbar>
  );
};

Toast.propTypes = {
  alert: oneOf(ALERTS),
  anchor: shape({
    horizontal: oneOf(HORIZONTAL_ANCHORS),
    vertical: oneOf(VERTICAL_ANCHORS),
  }),
  clickAway: bool,
  close: func,
  closeButton: string,
  elevation: number,
  isOpen: bool,
  showDuration: number,
  children: any,
};

export default Toast;
