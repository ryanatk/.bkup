import cx from 'classnames';
import { ReactElement } from 'react';
import styles from './HeaderOverlay.module.scss';

interface Props {
  open: boolean;
  onClick?: () => void;
}

const HeaderOverlay = ({ open, onClick = () => null }: Props): ReactElement => {
  return (
    <div
      className={cx(styles.overlay, {
        [styles.open]: open,
      })}
      aria-hidden="true"
      onClick={onClick}
    />
  );
};

export default HeaderOverlay;
