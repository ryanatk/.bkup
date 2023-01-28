import { KeyboardArrowDown } from '@material-ui/icons';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Grid,
  VectorImage,
} from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import {
  HamburgerButton,
  HeaderBlur,
  HeaderLinks,
  HeaderOverlay,
} from '../../sormus/Header/components';
import { useStickyHeader } from '../../sormus/Header/hooks';
import { MAIN_CONTENT_ID } from '../../sormus/MainContent';
import styles from './BusinessHeader.module.scss';
import { SectionLink, Typ } from './components';
import { SECTION } from './data';
import { SectionProps } from './data/section';

interface SectionsListProps {
  className?: string;
}

const SectionsList = ({ className }: SectionsListProps): ReactElement => (
  <ul className={className}>
    {Object.values(SECTION).map((section: SectionProps) => (
      <li key={section.id} className={cx(styles.sectionItem)}>
        <SectionLink section={section} />
      </li>
    ))}
  </ul>
);

const BusinessHeader = forwardRef(function BusinessHeaderFC(
  props,
  ref: Ref<HTMLDivElement>,
): JSX.Element {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const { sticky, pinned, measuredRef, wrapperStyles } = useStickyHeader({
    alwaysPin: true,
  });
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const router = useRouter();

  const handleHamburgerClick = () => {
    setOffcanvasOpen((prevOffcanvasOpen) => !prevOffcanvasOpen);
  };

  const handleOverlayClick = () => {
    setOffcanvasOpen(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      console.log('route change: nav');
      setOffcanvasOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Typ
      Element="div"
      className={cx(styles.wrap, {
        [styles.sticky]: sticky,
        [styles.pinned]: pinned,
      })}
      style={wrapperStyles}
      ref={ref}
    >
      {isLargeScreen && <HeaderBlur sticky={sticky} pinned={pinned} />}

      <HeaderOverlay open={offcanvasOpen} onClick={handleOverlayClick} />

      <header ref={measuredRef} className={styles.header}>
        <Grid className="gap-y-0">
          <div className={styles.content}>
            {!isLargeScreen && (
              <HamburgerButton
                onClick={handleHamburgerClick}
                open={offcanvasOpen}
              />
            )}

            <Link href="/">
              <a className={styles.logo} id="nav_home" aria-label="Oura home">
                <VectorImage
                  color="inherit"
                  name="oura-business"
                  maxWidth={isLargeScreen ? 170 : 122}
                />
              </a>
            </Link>

            {!(isLargeScreen && sticky) && (
              <HeaderLinks
                offcanvasOpen={offcanvasOpen}
                isInverse={false}
                shopButton={false}
              />
            )}
          </div>

          <div className={styles.sections}>
            {isLargeScreen ? (
              <SectionsList className={cx(styles.sectionsList)} />
            ) : (
              <div className={styles.accordion}>
                <Grid>
                  <div className="col-main">
                    <Accordion
                      icon={<KeyboardArrowDown className="text-inherit" />}
                      openAtIndex={-1}
                    >
                      <AccordionHeader>
                        <SectionLink
                          className={cx(styles.accordionHeader)}
                          section={{
                            name: 'business_section_handle_main',
                            id: MAIN_CONTENT_ID,
                          }}
                          // so the link is clickable within the clickable AccordionHeader
                          onClick={(event) => event.stopPropagation()}
                        />
                      </AccordionHeader>

                      <AccordionContent>
                        <Grid className={styles.accordionContent}>
                          <SectionsList className={styles.sectionsList} />
                        </Grid>
                      </AccordionContent>
                    </Accordion>
                  </div>
                </Grid>
              </div>
            )}
          </div>
        </Grid>
      </header>
    </Typ>
  );
});

export default BusinessHeader;
