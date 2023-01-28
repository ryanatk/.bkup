import { Redirect } from 'react-router';

import { Content, Require } from 'common/components';
import { useShop } from 'app/context';

const ResumeOrder = ({ entry }) => {
  const { ooSummaryId } = useShop();

  console.log('<ResumeOrder>', { ooSummaryId, entry });

  return (
    <Require shop>
      {entry ? <Redirect to={entry} /> : <Content isLoading={!true} />}
    </Require>
  );
};

export default ResumeOrder;
