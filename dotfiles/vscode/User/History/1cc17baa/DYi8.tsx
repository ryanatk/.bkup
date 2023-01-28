import { paypal, zuora } from '../../../consts/scripts';
import addScript from '../../../utils/addScript';

const loadMyAccountScripts = (): (() => void)[] =>
  [paypal, zuora].map(addScript);

export default loadMyAccountScripts;
