import { ReactElement } from 'react';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import Bilbo from './bilbo';
import Simple from './simple';

const BusinessPage = (): ReactElement => {
  const isNewDesign = checkFeatureFlag('b2b-page-new-design');

  if (isNewDesign) {
    return <Simple />;
  }

  return <Bilbo />;
};

export default BusinessPage;
