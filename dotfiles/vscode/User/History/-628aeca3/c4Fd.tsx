import Link, { LinkProps } from 'next/link';
import { HTMLProps } from 'react';
import { EventType, sendSegmentTrack } from '../../../analytics';
import IconForwardArrow from '../../../svg/design-tokens/icon_forward_arrow.svg';
import Icon from '../Icon';
import styles from './HeaderLinks.module.scss';

const NavLink = ({
  href,
  id,
  children,
  ...props
}: LinkProps & HTMLProps<HTMLAnchorElement>): JSX.Element => {
  const handleAnalytics = () => {
    sendSegmentTrack({
      type: EventType.LinkClicked,
      payload: {
        cta: href,
        location: 'header',
      },
    });
  };
  return (
    <li className={styles.navLink}>
      <Link href={href} passHref {...props}>
        <a data-menu-link id={id} onClick={handleAnalytics}>
          <span>{children}</span>
          <Icon className={styles.navLinkArrow} aria-hidden="true">
            <IconForwardArrow />
          </Icon>
        </a>
      </Link>
    </li>
  );
};

export default NavLink;
