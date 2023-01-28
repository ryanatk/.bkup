import SvgIcon from '@material-ui/core/SvgIcon';
import cx from 'classnames';
import styles from './Icon.module.scss';

interface IconProps {
  children: React.ReactElement;
  outlined?: boolean;
  size?: 'default' | 'large' | 'xl';
  [x: string]: any;
}

const Icon = ({
  children,
  outlined = false,
  size = 'default',
  ...props
}: IconProps): JSX.Element => (
  <SvgIcon
    className={cx(styles.Icon, {
      [styles['Icon--Outlined']]: outlined,
      [styles['Icon--Large']]: size === 'large',
      [styles['Icon--XL']]: size === 'xl',
    })}
    {...props}
  >
    {children}
  </SvgIcon>
);

export default Icon;
