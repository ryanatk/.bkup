import { Toolbar } from '@mui/material';

import styles from './HeaderSpacer.module.css';

// empty Toolbar used to provide top-space for "fixed" AppBar
const HeaderSpacer = ({ children }) => (
  <div className={styles.space}>
    <Toolbar />
    {children}
  </div>
);

export default HeaderSpacer;
