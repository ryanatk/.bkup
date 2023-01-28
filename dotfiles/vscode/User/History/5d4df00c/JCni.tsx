import { ReactElement } from 'react';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import Bilbo from './bilbo';
import Simple from './simple';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('business-page');
  const isNewDesign = checkFeatureFlag('b2b-page-new-design');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  if (isNewDesign) {
    return <Simple />;
  }

  return <Bilbo />;
};

export default BusinessPage;
