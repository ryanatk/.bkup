import { ReactElement } from 'react';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import Simple from './simple';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('business-page');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  return <Simple />;
};

export default BusinessPage;
