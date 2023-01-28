import { readFileSync } from 'fs';

const styles = readFileSync('./hubSpotForms.css');

const getStyles = () => {
  console.log({ styles }, styles.toString());
  return styles.toString();
};

export default getStyles;
