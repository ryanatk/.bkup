import { Redirect } from 'react-router';

import { Content, Require } from 'common/components';

const ResumeOrder = ({ entry }) => {
  console.log('<ResumeOrder>', { entry });

  return (
    <Require shop>
      {entry ? <Redirect to={entry} /> : <Content isLoading={!true} />}
    </Require>
  );
};

export default ResumeOrder;
