// import { readFileSync } from 'fs';
//   const styles = readFileSync('./hubSpotForms.css');
import styles from './hubSpotForms.css.txt';

const getStyles = (): string => {
  console.log({ styles }, styles.toString());
  return styles.toString();
};

export default getStyles;
