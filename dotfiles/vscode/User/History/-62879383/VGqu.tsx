import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
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
    classNames: string[];
  };
} = {
  I: {
    Element: 'h2',
    variant: 'h3',
    classNames: ['list-upper-roman', 'ml-24'],
  },
  A: {
    Element: 'h3',
    variant: 'h4',
    classNames: ['list-upper-alpha', 'ml-28 mb-4'],
  },
  i: {
    Element: 'h4',
    variant: 'h5',
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
  const { Element, variant, classNames } = HEADING[level];

  return (
    <>
      <Typography
        className={cx('list-item', classNames, className)}
        Element={Element}
        variant={variant}
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
