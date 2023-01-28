import { useState } from 'react';
import { object, string } from 'prop-types';
import cx from 'classnames';
import { Box } from '@mui/material';

import styles from 'Wrap.module.css';

const withWrap =
  (Component) =>
  ({ className, floating, ...props }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <Box
        className={cx(className, styles.box)}
        sx={{
          boxShadow: 2,
          zIndex: 'modal',
        }}
      >
        <Component {...props} isActive={isActive} setIsActive={setIsActive} />
      </Box>
    );
  };

withWrap.propTypes = {
  className: string,
  sx: object,
};

withWrap.defaultProps = {
  className: '',
  sx: {},
};

export default withWrap;
