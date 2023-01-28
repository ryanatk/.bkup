import { string } from 'prop-types';

import { useClick } from 'common/hooks';
import { getSiteOwnership } from 'common/utils';

import CONFIG from './config';

import styles from './Logo.module.css';

const Logo = ({ name, className, ...rest }) => {
  const logoName = name ?? getSiteOwnership();
  const { src, alt } = CONFIG[logoName];
  const { component: Component, ...props } = useClick(rest);

  return (
    <Component {...props} className={className}>
      <img className={styles.image} src={src} alt={alt} />
    </Component>
  );
};

Logo.propTypes = {
  name: string,
  className: string,
};

export default Logo;
