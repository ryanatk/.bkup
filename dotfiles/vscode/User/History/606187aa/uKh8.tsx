import { ReactElement } from 'react';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import OriginalFsa from './OriginalFsa';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('fsa-page');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  return <OriginalFsa />;
};

export default BusinessPage;
