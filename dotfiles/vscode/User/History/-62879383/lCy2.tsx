import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
  TypographyWeight,
} from '../../../components/sormus/Typography';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

/**
 * Represents legal section/article/sub-section references
 * in the document's hierarchy ()
 */
type LevelType = 'I' | 'A' | 'i';

const HEADING: {
  [x in LevelType]: {
    Element: TypographyElement;
    variant: TypographyVariant;
    weight: TypographyWeight;
    classNames: string[];
  };
} = {
  I: {
    Element: 'h2',
    variant: 'h4',
    weight: 'medium',
    classNames: ['list-upper-roman', 'ml-20'],
  },
  A: {
    Element: 'h3',
    variant: 'h4',
    weight: 'normal',
    classNames: ['list-upper-alpha', 'ml-24 mb-4'],
  },
  i: {
    Element: 'h4',
    variant: 'h5',
    weight: 'light',
    classNames: ['list-lower-roman', 'ml-24'],
  },
};

interface Props {
  level: LevelType;
  tx: MessageKey;
  className?: string;
  children?: ReactNode;
  id?: string;
}

const Heading = ({
  level,
  tx: text,
  className,
  children,
  id,
}: Props): ReactElement => {
  const { Element, variant, weight, classNames } = HEADING[level];

  return (
    <>
      <Typography
        className={cx('list-item', classNames, className)}
        Element={Element}
        variant={variant}
        weight={weight}
        id={id}
      >
        {tx(text)}
      </Typography>

      {children && (
        <Typography Element="section" className="normal-case">
          {children}
        </Typography>
      )}
    </>
  );
};

export default Heading;
