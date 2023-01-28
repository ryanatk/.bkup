import React from 'react';
import IconArrowDown from '../../../svg/design-tokens/icon_arrow_down.svg';
import Icon from '../Icon';
import Typography, { TypographyElement } from '../Typography';
import styles from './TOCEntry.module.scss';

export interface TOCEntryProps {
  label: JSX.Element | string;
  summary?: JSX.Element | string;
  onLinkClick?: () => void;
  icon: React.ReactElement;
  headingElement?: TypographyElement;
}

const TOCEntry = ({
  onLinkClick,
  label,
  summary,
  icon,
  headingElement,
}: TOCEntryProps) => {
  const content = (
    <div className={styles.TOCEntry__Grid}>
      <div className={styles.TOCEntry__IconCompartment}>{icon}</div>
      <div className={styles.TOCEntry__LabelCompartment}>
        <Typography
          color="inherit"
          variant="h6"
          weight="normal"
          className={styles.TOCEntry__Label}
        >
          {label}
        </Typography>
        {summary && (
          <Typography color="inherit" className="mt-2">
            {summary}
          </Typography>
        )}
      </div>
      {onLinkClick && (
        <div className={styles.TOCEntry__LinkCompartment}>
          <Icon outlined>
            <IconArrowDown />
          </Icon>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.TOCEntry}>
      {onLinkClick ? (
        <button
          data-el="toc-entry"
          onClick={onLinkClick}
          className={styles.TOCEntry__Button}
        >
          {content}
        </button>
      ) : (
        <div data-el="toc-entry">{content}</div>
      )}
    </div>
  );
};

export default TOCEntry;
