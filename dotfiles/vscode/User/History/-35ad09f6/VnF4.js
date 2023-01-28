import { Redirect } from 'react-router';

import { Content, Require } from 'common/components';
import useEnterOrder from '../useEnterOrder';

const ResumeOrder = ({ steps }) => {
  // console.log('<ResumeOrder>', { entry });

  // get entry
  const { entry } = useEnterOrder({ steps });

  return (
    <Require shop>
      {entry ? <Redirect to={entry} /> : <Content isLoading={!true} />}
    </Require>
  );
};

export default ResumeOrder;
