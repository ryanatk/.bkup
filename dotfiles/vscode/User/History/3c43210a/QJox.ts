import { readFileSync } from 'fs';

const getStyles = () => {
  console.log({ readFileSync });
  const styles = readFileSync('./hubSpotForms.css');
  console.log({ styles }, styles.toString());
  return styles.toString();
};

export default getStyles;
