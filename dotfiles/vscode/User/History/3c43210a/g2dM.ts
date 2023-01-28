import { readFileSync } from 'fs';

const styles = readFileSync('./hubSpotForms.css').toString();
console.log({ styles });

export default styles;
