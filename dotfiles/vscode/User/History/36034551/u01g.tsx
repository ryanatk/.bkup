import cx from 'classnames';
import { FC } from 'react';
import styles from './Typography.module.scss';

type TypographyVariantLegacy =
  | 'super'
  | 'heading'
  | 'subhead1'
  | 'subhead2'
  | 'subhead3'
  | 'body'
  | 'body2'
  | 'caption';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'eyebrow'
  | 'caption'
  | 'grow'
  | 'body';

type TypographyHeight =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose';

export type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ol'
  | 'ul'
  | 'li'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'a'
  | 'span'
  | 'div'
  | 'em'
  | 'strong'
  | 'sup'
  | 'sub';

type TypographyAlignment = 'left' | 'right' | 'center';

type TypographyWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface TypographyProps {
  variant?: TypographyVariant | TypographyVariantLegacy;
  Element?: TypographyElement;
  className?: string;
  color?: string;
  align?: TypographyAlignment;
  weight?: TypographyWeight;
  height?: TypographyHeight;
  [x: string]: any; // additional props
}

const mapLegacyVariant = {
  super: 'h1',
  heading: 'h2',
  subhead1: 'h4',
  subhead2: 'h5',
  subhead3: 'h6',
  body: 'body',
  body2: 'eyebrow',
};

const Typography: FC<TypographyProps> = ({
  variant = 'body',
  children,
  color = 'helsinkiBlue',
  className = '',
  align,
  Element = 'p',
  weight = '',
  height = '',
  ...props
}) => {
  return (
    <Element
      className={cx(
        styles[`Typography-${mapLegacyVariant[variant] || variant}`],
        {
          [`text-${color}`]: Boolean(color),
          [`font-${weight}`]: Boolean(weight),
          [`leading-${height}`]: Boolean(height),
          [`text-${align}`]: Boolean(align),
        },
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;
export type { TypographyVariantLegacy as TextVariantType };
