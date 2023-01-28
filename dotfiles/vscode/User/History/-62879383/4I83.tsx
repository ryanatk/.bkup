import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { MessageKey } from '../../../../public/locales/setup';
import { Typography } from '../../../sormus';
import {
  TypographyElement,
  TypographyVariant,
  TypographyWeight,
} from '../../../sormus/Typography';
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
    variant: 'h5',
    weight: 'normal',
    classNames: ['list-upper-alpha', 'ml-28 mb-4'],
  },
  i: {
    Element: 'h4',
    variant: 'h6',
    weight: 'normal',
    classNames: ['list-lower-roman', 'ml-28'],
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
        className={cx('list-item uppercase', classNames, className)}
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
