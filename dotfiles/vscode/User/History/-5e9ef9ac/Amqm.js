import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'app/context';
import { ROUTE } from 'common/const';

function PrivateRoute(props) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Route {...props} /> : <Redirect to={ROUTE.LOGIN} />;
}

export default PrivateRoute;
