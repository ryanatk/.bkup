import { ReactElement } from 'react';
import styles from './HeaderBlur.module.scss';

const HeaderBlur = (): ReactElement => {
  return <div className={styles.wrapperBlur} aria-hidden="true" />;
};

export default HeaderBlur;
