import { ReactElement } from 'react';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import Original from './Original';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('fsa-page');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  return <Original />;
};

export default BusinessPage;
