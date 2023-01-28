import { useState } from 'react';
import { string } from 'prop-types';
import cx from 'classnames';
import { Box } from '@mui/material';

import styles from './withShadow.module.css';

const withShadow =
  (Component) =>
  ({ className, boxShadow = 2, zIndex = 'modal', ...props }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <Box
        className={cx(className, styles.wrap)}
        sx={{
          boxShadow,
          zIndex, // TODO: remove prop & move to className, once created
        }}
      >
        <Component {...props} isActive={isActive} setIsActive={setIsActive} />
      </Box>
    );
  };

withShadow.propTypes = {
  className: string,
};

export default withShadow;
