import { CircularProgress } from '@material-ui/core';
import cx from 'classnames';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonInterface {
  children: React.ReactElement | React.ReactFragment | string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  [x: string]: any;
}

type ButtonCompartmentProps = ButtonInterface;

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'basic'
  | 'body-link';

export type ButtonSize = 'normal' | 'small' | 'medium' | 'large';

export type ButtonColor = 'helsinkiBlue' | 'helsinkiBlue-dark' | 'ensoBlue';

export interface ButtonProps extends ButtonInterface {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  link?: boolean;
  loadingTextEnabled?: boolean;
}

const ButtonCompartment = ({
  children,
  startIcon,
  endIcon,
}: ButtonCompartmentProps) => {
  return (
    <span className={styles['button__compartment']}>
      {startIcon && <i aria-hidden="true">{startIcon}</i>}
      <span>{children}</span>
      {endIcon && <i aria-hidden="true">{endIcon}</i>}
    </span>
  );
};

const Button = ({
  variant = 'primary',
  link = false,
  children,
  startIcon,
  endIcon,
  className = '',
  loading = false,
  disabled = false,
  size = 'normal',
  color,
  loadingTextEnabled,
  ...props
}: ButtonProps): JSX.Element => {
  if (!children) return;
  const classList = cx(
    styles[`button--${variant}`],
    styles[`button--size-${size}`],
    className,
    {
      [styles[`button--color-${color}`]]: Boolean(color),
    },
  );

  if (link) {
    return (
      <Link href={props.href} passHref>
        <a role="link" className={classList} {...props}>
          <ButtonCompartment startIcon={startIcon} endIcon={endIcon}>
            {children}
          </ButtonCompartment>
        </a>
      </Link>
    );
  } else {
    return (
      <button disabled={loading || disabled} className={classList} {...props}>
        {loading ? (
          <>
            <CircularProgress
              data-cy="button-loading"
              className="text-inherit -mb-1"
              size={20}
              thickness={3}
            />
            {loadingTextEnabled && (
              <div className="inline-flex gap-2 content-center justify-center ml-4">
                {children}
              </div>
            )}
          </>
        ) : (
          <ButtonCompartment startIcon={startIcon} endIcon={endIcon}>
            {children}
          </ButtonCompartment>
        )}
      </button>
    );
  }
};

export default Button;
