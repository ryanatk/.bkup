import { Redirect, useHistory } from 'react-router';
import { useCallback, useMemo } from 'react';
import { merge } from 'lodash';

import { useShop } from 'app/context';
import { ROUTE, BOOTH_SETUP } from 'common/const';
import { Page } from 'common/site';
import { Wizard } from 'common/components';
import { useBoothAssessment } from 'common/hooks';
import PrivateRoute from 'routes/PrivateRoute';
import { ResumeOrder, StartOrder } from 'routes/booth-setup';

import { getStep, Number, Location, Type, Size } from './steps';

import styles from './BoothSetup.module.css';

const BoothSetup = () => {
  console.log('<BoothSetup>');

  // get assessment list from server
  const { ooSummaryId } = useShop();
  const { list, submit, isLoading, isSubmitting, error } = useBoothAssessment(
    ooSummaryId,
    {
      questionType: 1,
    },
  );
  const history = useHistory();

  // combine list with config & nav
  const steps = useMemo(() => {
    const asdf = {
      error,
      isLoading,
      isSubmitting,
    };

    list?.map((item, index) => {
      const step = getStep({ item, list, index, history, submit });

      return merge({}, step, asdf);
    });
  }, [history, error, isLoading, isSubmitting, list, submit]);

  const findStep = useCallback(
    (config) =>
      steps?.find(({ templateId }) => templateId === config.templateId),
    [steps],
  );

  return (
    <Page className={styles.page} backTo={ROUTE.DASHBOARD} title="Booth Setup">
      <Wizard backTo={ROUTE.DASHBOARD} nextTo={ROUTE.CATALOG}>
        {/* Enter Order */}
        <PrivateRoute path={ROUTE.START_ORDER + '/:eventId'}>
          {/* <StartOrder entry={entry} /> */}
          <StartOrder steps={steps} />
        </PrivateRoute>

        <PrivateRoute path={ROUTE.RESUME_ORDER}>
          {/* <ResumeOrder entry={entry} /> */}
          <ResumeOrder steps={steps} />
        </PrivateRoute>

        {/* Redirect /booth */}
        <PrivateRoute exact path={ROUTE.BOOTH_SETUP}>
          <Redirect to={ROUTE.DASHBOARD} />
        </PrivateRoute>

        {/* Booth Setup Steps */}
        <PrivateRoute
          exact
          path={ROUTE.BOOTH_NUMBER}
          render={() => <Number step={findStep(BOOTH_SETUP.NUMBER)} />}
        />

        <PrivateRoute
          exact
          path={ROUTE.BOOTH_TYPE}
          render={() => <Type step={findStep(BOOTH_SETUP.TYPE)} />}
        />

        <PrivateRoute
          exact
          path={ROUTE.BOOTH_LOCATION}
          render={() => <Location step={findStep(BOOTH_SETUP.LOCATION)} />}
        />

        <PrivateRoute
          exact
          path={ROUTE.BOOTH_SIZE}
          render={() => <Size step={findStep(BOOTH_SETUP.SIZE)} />}
        />
      </Wizard>
    </Page>
  );
};

export default BoothSetup;
