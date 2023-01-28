import { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

import { Content, IconButton, Loading } from 'common/components';
import { BORDER, COLOR, ROUTE, TEXT } from 'common/const';
import { date, DATE_FORMAT } from 'common/utils';

import styles from './Results.module.css';

const Results = ({ results, isLoading, error }) => {
  // console.log('<Results>', { list, isLoading, error });

  const list = useMemo(() => results ?? [], [results]);
  const isRerender = useRef(false); // as opposed to initial render
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isRerender.current) {
      setIsUpdating(true);
    } else {
      // only set to true if we got a list or an error
      isRerender.current = Boolean(list.length) || error;
    }

    const timeout = setTimeout(() => setIsUpdating(false), 500);

    return () => clearTimeout(timeout); // cancel timeout if another update starts
  }, [list, error]);

  return (
    <Content
      isLoading={isLoading}
      error={error?.message}
      waitFor={() => Boolean(results)}
    >
      <h4 className={cx(TEXT.CAPTION, COLOR.GREY_600, styles.feedback)}>
        {isUpdating ? (
          <span className={styles.loading}>
            <Loading size="button" />
          </span>
        ) : (
          `${list.length} Results`
        )}
      </h4>

      <ol className={styles.list}>
        {list.map((event) => (
          <li key={event.id} className={cx(BORDER.GREY_100, styles.item)}>
            <article>
              <h5 className={cx(TEXT.SUBTITLE, styles.name)}>{event.name}</h5>

              <p aria-label="Event Date">
                {[event.dateStart, event.dateEnd].map((eventDate, i) => (
                  <time
                    key={event.id + eventDate + i}
                    dateTime={date(eventDate).format(DATE_FORMAT.SERVER_DATE)}
                    className={cx(COLOR.GREY_800, styles.date)}
                  >
                    {date(eventDate).format(DATE_FORMAT.FULL_DATE)}
                  </time>
                ))}
              </p>

              <address className={cx(COLOR.GREY_800, TEXT.BODY_2)}>
                <span aria-label="Venue Name" className={styles.venue}>
                  {event.facilityName}
                </span>
                <span aria-label="Venue Location" className={styles.venue}>
                  {event.facilityLocation}
                </span>
              </address>
            </article>

            <IconButton
              className={styles.icon}
              icon="caret-right"
              to={ROUTE.START_ORDER + '/' + event.id}
              aria-label={`Select ${event.name}`}
            />
          </li>
        ))}
      </ol>
    </Content>
  );
};

export default Results;
