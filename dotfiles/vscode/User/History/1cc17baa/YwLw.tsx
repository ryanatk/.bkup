import { paypal, zuora } from '../../../consts/scripts';
import addScript from '../../../utils/addScript';

const loadMyAccountScripts = (): (() => void)[] =>
  [paypal, zuora].map((script) => addScript(script));

export default loadMyAccountScripts;
