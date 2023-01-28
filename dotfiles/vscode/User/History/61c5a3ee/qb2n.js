import { Redirect } from 'react-router';
import { useCallback, useMemo } from 'react';
import { merge } from 'lodash';

import { useShop } from 'app/context';
import { ROUTE, BOOTH_SETUP } from 'common/const';
import { Page } from 'common/site';
import { Wizard } from 'common/components';
import { useBoothAssessment } from 'common/hooks';
import PrivateRoute from 'routes/PrivateRoute';
import { ResumeOrder, StartOrder } from 'routes/booth-setup';

import { Number, Location, Type, Size } from './steps';

import styles from './BoothSetup.module.css';

const BoothSetup = () => {
  console.log('<BoothSetup>');

  // get assessment list from server
  const { ooSummaryId } = useShop();
  const { list, isReady, submit } = useBoothAssessment(ooSummaryId, {
    questionType: 1,
    // onSuccess: next,
  });

  // combine list with config & nav
  const steps = useMemo(
    () =>
      list?.map((item) => {
        const config = Object.values(BOOTH_SETUP).find(
          (step) => step.templateId === item.templateId,
        );

        return merge(
          {
            backTo: ROUTE.DASHBOARD,
            nextTo: ROUTE.CATALOG,
            config: Object.values(BOOTH_SETUP).find(
              (step) => step.templateId === item.templateId,
            ),
          },
          item,
          { isReady, submit },
        );
      }),
    [list, isReady, submit],
  );

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
          render={() => <Type {...BOOTH_SETUP.TYPE} />}
        />

        <PrivateRoute
          exact
          path={ROUTE.BOOTH_LOCATION}
          render={() => <Location {...BOOTH_SETUP.LOCATION} />}
        />

        <PrivateRoute
          exact
          path={ROUTE.BOOTH_SIZE}
          render={() => <Size {...BOOTH_SETUP.SIZE} />}
        />
      </Wizard>
    </Page>
  );
};

export default BoothSetup;
