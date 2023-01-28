import { paypal, zuora } from '../../../consts/scripts';
import addScript from '../../../utils/addScript';

const loadCheckoutScripts = (): (() => void)[] =>
  [paypal, zuora].map((script) => addScript(script));

export default loadCheckoutScripts;
