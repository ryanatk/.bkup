import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { Children, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Accordion.module.scss';

/**
 * Get scrollHeight of HTML element
 */
const getElementHeight = (el: HTMLElement): string =>
  el && el.scrollHeight > 0 ? `${el.scrollHeight}px` : `100vh`;

export const AccordionHeader = ({ children }) => <>{children}</>;
export const AccordionContent = ({ children }) => <>{children}</>;

const AHeader = ({ onClick, expanded = false, icon, children, ...rest }) => (
  <button onClick={onClick} className={styles.accordion__header} {...rest}>
    {children}
    {icon && (
      <span
        aria-hidden
        className={`${styles.accordion__icon} ${
          expanded && styles['accordion__icon--expanded']
        }`}
      >
        {icon}
      </span>
    )}
  </button>
);

const AContent = ({ children, expanded = false, ...rest }) => {
  const el = useRef(null);

  return (
    <div
      ref={el}
      className={styles.accordion__content}
      css={css`
        max-height: ${!expanded ? '0' : getElementHeight(el.current)};
      `}
      aria-expanded={expanded}
      style={{ visibility: expanded ? 'visible' : 'hidden' }}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface AccordionProps {
  /** optional param to start accordion open at specific AccordionContent index */
  openAtIndex?: number;
  /** optional icon to decorate the accordion header */
  icon?: JSX.Element;
  /** optional prop to let accordion know that the accordion children are nested under a map */
  nested?: boolean;
  /** optional callback function to call when open accordion changes */
  onChange?: (open: number) => void;
  /** optionally reset when open route (url) changes */
  resetOnNav?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  openAtIndex = 1,
  icon,
  children,
  nested = false,
  onChange = () => {},
  resetOnNav,
}) => {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (openAtIndex > 0) setOpen(openAtIndex);
  }, [openAtIndex]);

  useEffect(() => {
    if (!open) return;

    onChange(open);
  }, [open]);

  const handleOpen = (index: number) => {
    if (checkExpanded(index)) setOpen(null);
    else setOpen(index);
  };

  useEffect(() => {
    if (!resetOnNav) {
      return;
    }

    const handleRouteChange = () => {
      console.log('route change: accordion');
      setOpen(openAtIndex);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('hashChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('hashChangeStart', handleRouteChange);
    };
  }, [router.events, setOpen, openAtIndex, resetOnNav]);

  const checkExpanded = (index: number) => open === index;

  const getChildren = () => {
    if (nested) {
      const nestedChildren = (children as Array<ReactNode>).map(
        (el) => el['props'].children,
      );
      return Children.toArray(nestedChildren);
    }
    return Children.toArray(children);
  };

  return (
    <>
      {getChildren().map((child, index) => (
        <div key={`accordion-${index}`} className="fuck">
          {index % 2 ? (
            <AContent
              expanded={checkExpanded(index)}
              aria-labelledby={`accordion-${index}`}
              {...child['props']}
            />
          ) : (
            <AHeader
              onClick={() => handleOpen(index + 1)}
              expanded={checkExpanded(index + 1)}
              aria-controls={`accordion-${index}`}
              icon={icon}
              {...child['props']}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Accordion;
