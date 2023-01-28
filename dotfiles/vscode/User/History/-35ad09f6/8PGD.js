import { array } from 'prop-types';
import { Redirect } from 'react-router';

import { Content, Require } from 'common/components';
import useEnterOrder from '../useEnterOrder';

const ResumeOrder = ({ steps }) => {
  // console.log('<ResumeOrder>', { steps });

  // get entry
  const entry = useEnterOrder(steps);

  return (
    <Require shop>
      {entry ? <Redirect to={entry} /> : <Content isLoading={!true} />}
    </Require>
  );
};

ResumeOrder.propTypes = {
  step: array,
};

export default ResumeOrder;
