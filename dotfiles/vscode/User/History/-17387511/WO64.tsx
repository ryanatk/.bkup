import { paypal, zuora } from '../../../consts/scripts';
import addScript from '../../../utils/addScript';

const loadCheckoutScripts = (): (() => []) => [paypal, zuora].map(addScript);

export default loadCheckoutScripts;
