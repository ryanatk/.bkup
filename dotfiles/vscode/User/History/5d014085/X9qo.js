import { any, bool, func, string } from 'prop-types';
import cx from 'classnames';
import { Box, ClickAwayListener } from '@mui/material';

import styles from './ClickOutside.module.css';

const ClickOutside = ({ floating, onClick, className, children, ...props }) => {
  // console.log('<ClickOutside>', { floating, className, props });

  return (
    <ClickAwayListener onClickAway={onClick}>
      <Box
        className={cx(className, styles.box)}
        sx={{
          boxShadow: floating ? 2 : 0,
          zIndex: floating ? 'modal' : 'auto',
        }}
        {...props}
      >
        {children}
      </Box>
    </ClickAwayListener>
  );
};

ClickOutside.propTypes = {
  floating: bool,
  className: string,
  onClick: func.isRequired,
  children: any.isRequired,
};

export default ClickOutside;
