import { useState } from 'react';
import { string } from 'prop-types';
import cx from 'classnames';
import { Box } from '@mui/material';

import styles from './withShadow.module.css';

const withShadow =
  (Component) =>
  ({ className, ...props }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <Box
        className={cx(className, styles.wrap)}
        sx={{
          boxShadow: 2,
          zIndex: 'modal',
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
