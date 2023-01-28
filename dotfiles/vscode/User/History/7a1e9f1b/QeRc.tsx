import SvgIcon from '@material-ui/core/SvgIcon';
import cx from 'classnames';
import styles from './Icon.module.scss';

interface IconProps {
  children: React.ReactElement;
  outlined?: boolean;
  square?: boolean;
  size?: 'default' | 'large';
  [x: string]: any;
}

const Icon = ({
  children,
  outlined = false,
  square,
  size = 'default',
  ...props
}: IconProps) => (
  <SvgIcon
    className={cx(styles.Icon, {
      [styles['Icon--Outlined']]: outlined,
      [styles['Icon--Large']]: size === 'large',
    })}
    {...props}
  >
    {children}
  </SvgIcon>
);

export default Icon;
