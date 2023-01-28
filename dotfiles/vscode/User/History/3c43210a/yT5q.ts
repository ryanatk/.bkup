import { readFileSync } from 'fs';

const getStyles = () => {
  const styles = readFileSync('./hubSpotForms.css');
  console.log({ styles }, styles.toString());
  return styles.toString();
};

export default getStyles;
