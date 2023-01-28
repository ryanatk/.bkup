import cx from 'classnames';
import { CSSProperties } from 'react';
import useTailwindThemeValue from '../../../hooks/useTailwindThemeValue';
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

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'eyebrow'
  | 'caption'
  | 'body';

type TypographyHeight =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose'
  | 'heading';

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
  | 'sub'
  | 'section';

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

export interface TypographyProps {
  variant?: TypographyVariant | TypographyVariantLegacy;
  Element?: TypographyElement;
  className?: string;
  color?: string;
  align?: CSSProperties['textAlign'];
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

const Typography = ({
  variant = 'body',
  children,
  color = 'helsinkiBlue-dark',
  className,
  align,
  Element = 'p',
  weight,
  height,
  ...props
}: TypographyProps): JSX.Element => {
  const colorHex = useTailwindThemeValue('colors', color);
  const fontWeight = useTailwindThemeValue<CSSProperties['fontWeight']>(
    'fontWeight',
    weight,
  );
  const lineHeight = useTailwindThemeValue('lineHeight', height);
  return (
    <Element
      className={cx(
        styles[`Typography-${mapLegacyVariant[variant] || variant}`],
        className,
      )}
      style={{
        color: colorHex,
        fontWeight,
        lineHeight,
        textAlign: align,
      }}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;
export type { TypographyVariantLegacy as TextVariantType };
