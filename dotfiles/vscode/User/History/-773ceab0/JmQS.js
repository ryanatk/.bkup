import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { ROUTE } from 'common/const';

import PrivateRoute from './PrivateRoute';
import { Account } from './account';
import { BoothSetup, EventSearch, NewOrder } from './booth-setup';
import {
  ForgotPassword,
  Login,
  Signup,
  ResetPassword,
  SSO,
} from './onboarding';
import { Dashboard, OrderDetails, OrderHistory, OrderInvoice } from './orders';
import Shopping from './shopping';
import Checkout, { Confirmation, QuestionsPostOrder } from './checkout';
import { NotFound } from './info';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* onboarding */}
        <Route path={ROUTE.LOGIN} component={Login} />
        <Route path={ROUTE.SIGNUP} component={Signup} />
        <Route path={ROUTE.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTE.SSO} component={SSO} />

        {/* account */}
        <PrivateRoute path={ROUTE.ACCOUNT} component={Account} />

        {/* orders */}
        <PrivateRoute path={ROUTE.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={ROUTE.ORDERS} component={OrderHistory} />
        <PrivateRoute
          path={ROUTE.ORDER_DETAILS + '/:id'}
          component={OrderDetails}
        />
        <PrivateRoute
          path={ROUTE.ORDER_INVOICE + '/:id'}
          component={OrderInvoice}
        />

        {/* select event */}
        <PrivateRoute path={ROUTE.NEW_ORDER} component={NewOrder} />
        <PrivateRoute
          path={ROUTE.EVENT_SEARCH + '/:filter/:value'}
          component={EventSearch}
        />
        <PrivateRoute path={ROUTE.EVENT_SEARCH} component={EventSearch} />

        {/* booth setup */}
        <PrivateRoute
          path={[ROUTE.RESUME_ORDER, ROUTE.START_ORDER, ROUTE.BOOTH_SETUP]}
          component={BoothSetup}
        />

        {/* shopping */}
        <PrivateRoute path={ROUTE.SHOPPING} component={Shopping} />

        {/* checkout */}
        <PrivateRoute path={ROUTE.CHECKOUT} component={Checkout} />
        <PrivateRoute
          path={ROUTE.CONFIRMATION + '/:id'}
          component={Confirmation}
        />
        <PrivateRoute path={ROUTE.POST_ORDER} component={QuestionsPostOrder} />

        {/* misc */}
        <PrivateRoute path={ROUTE.HOME} exact>
          <Redirect to={ROUTE.DASHBOARD} />
        </PrivateRoute>
        <Route default component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
