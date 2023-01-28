import cx from 'classnames';
import { t } from '../../../public/locales/LocaleContext';
import styles from './HamburgerButton.module.scss';

export interface HamburgerButtonProps {
  onClick: () => void;
  open?: boolean;
}

const HamburgerButton = ({
  onClick = () => void 0,
  open = false,
}: HamburgerButtonProps): JSX.Element => {
  return (
    <button
      data-cy="nav_hamburger"
      className={cx(styles.hamburger, {
        [styles.open]: open,
      })}
      onClick={onClick}
    >
      <span className="sr-only">
        {t(
          open
            ? 'header_hamburger_close_sr_label'
            : 'header_hamburger_open_sr_label',
        )}
      </span>
      <span aria-hidden="true" className={styles.icon}>
        <span />
      </span>
    </button>
  );
};

export default HamburgerButton;
