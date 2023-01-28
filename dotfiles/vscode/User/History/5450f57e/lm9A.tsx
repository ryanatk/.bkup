/**
 * This page is meant to be informational.
 * We should not link to this page.
 * It should not be indexed by search engines.
 * FSA/HSA programs are for US only.
 * This page only appears in English (no translations).
 */

import { ReactElement } from 'react';
import OriginalFsa from '../../components/pages/fsa-hsa-info/Original/Original';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('fsa-page');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  return <OriginalFsa />;
};

export default BusinessPage;
