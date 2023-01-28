import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { object } from 'prop-types';
import cx from 'classnames';

import { BORDER, TEXT } from 'common/const';
import { Content, OptionButton, Require } from 'common/components';
import { useShop } from 'app/context';
import { getEventAssessmentLocation } from 'data/events';

import ErrorMessage from '../ErrorMessage';
import Step from './Step';

import styles from './Location.module.css';

const NO_AREA = 'no-name-area-name-for-error-handling';

const Location = ({ step }) => {
  // console.log('<Location>', { step });
  const { eventId, ooSummaryId } = useShop();

  // get updated locations options based on ooSummaryId
  const {
    data: location = [],
    isFetching: isLoadingLocations,
    error: locationError,
  } = useQuery(
    ['getEventAssessmentLocation', { eventId, ooSummaryId }],
    () => getEventAssessmentLocation({ eventId, ooId: ooSummaryId }),
    { refetchOnMount: true },
  );

  const {
    response,
    options = [],
    question,
    required,
    submit,
    error,
    isSubmitting,
    back,
    buttonText,
  } = step ?? {};

  const [hasError, setHasError] = useState();
  const [selected, setSelected] = useState(response);

  const locationOptions = useMemo(
    () => (!isLoadingLocations ? (!locationError ? location : options) : []),
    [location, isLoadingLocations, locationError, options],
  );

  useEffect(() => {
    const isInList = locationOptions.find(
      (opt) => opt.split(';')[1] === response,
    );

    if (isInList) {
      setSelected(response);
    } else {
      setSelected();
    }
  }, [locationOptions, response]);

  const area = useMemo(
    () =>
      locationOptions.reduce((obj, option) => {
        const [areaName, locationName] = option.split(';');

        return locationName // if no semi-colon, then use areaName without area
          ? {
              ...obj,
              [areaName]: obj[areaName]
                ? [...obj[areaName], locationName]
                : [locationName],
            }
          : {
              ...obj,
              [NO_AREA]: obj[NO_AREA]
                ? [...obj[NO_AREA], areaName]
                : [areaName],
            };
      }, {}),
    [locationOptions],
  );

  return (
    <Require data={[question]}>
      <Content
        isLoading={isLoadingLocations || isSubmitting}
        error={error?.message}
      >
        <Step
          submit={() => {
            if (required && !selected) {
              setHasError(true);
            } else {
              submit(selected);
            }
          }}
          isSubmitting={isSubmitting}
          back={back}
          buttonText={buttonText}
        >
          <h1 className={styles.p}>{question}</h1>

          <ul className={styles.locations}>
            {Object.entries(area).map(([areaName, locations]) => (
              <li className={cx(BORDER.DIVIDER, styles.area)} key={areaName}>
                {areaName !== NO_AREA && (
                  <h2 className={cx(TEXT.BODY_2, styles.heading)}>
                    {areaName}
                  </h2>
                )}

                <ul className={styles.list}>
                  {locations.map((opt) => (
                    <li key={areaName + opt}>
                      <OptionButton
                        value={opt}
                        selected={selected === opt}
                        onClick={(value) => setSelected(value)}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <ErrorMessage isOpen={hasError} close={() => setHasError(false)}>
            Please select an option to continue.
          </ErrorMessage>
        </Step>
      </Content>
    </Require>
  );
};

Location.propTypes = {
  step: object,
};

export default Location;
