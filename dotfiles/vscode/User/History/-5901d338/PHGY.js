import { useCallback, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { merge } from 'lodash';

import { ROUTE } from 'common/const';
import { Page } from 'common/site';
// import { getEventsList } from 'data/events';
import { getEventsByOwnership } from 'data/events';

import { ALL } from './const';
import Filter from './Filter';
import Input from './Input';
import Results from './Results';
import reducer, { init, TYPE } from './reducer';

import styles from './EventSearch.module.css';

const URL = ROUTE.EVENT_SEARCH;

const EventSearch = () => {
  // get search state from url params
  const params = merge({ filter: ALL }, useParams());
  const [search, dispatch] = useReducer(reducer, init(params));

  // load data
  const { isLoading, error } = useQuery(
    'getEventsByOwnership',
    getEventsByOwnership,
    {
      onSuccess: (payload) => dispatch({ type: TYPE.LOAD, payload }),
      refetchOnMount: true,
    },
  );

  // console.log('<EventSearch>', { params, search, isLoading, error });

  // callback to update url
  const history = useHistory();
  const updateUrl = useCallback(
    ({ filter = params.filter, value = params.value }) => {
      if (filter !== params.filter || value !== params.value) {
        const pushUrl = value ? [URL, filter, value].join('/') : URL;
        // console.log('!updateUrl', pushUrl, history.location);

        if (pushUrl !== history.location.pathname) {
          history.push(pushUrl);
          dispatch({ type: TYPE.UPDATE });
        }
      }
    },
    [history, params],
  );

  // watch for filter changes
  useEffect(() => {
    if (search.filter !== params.filter) {
      updateUrl({ filter: search.filter });
    }
  }, [search.filter, params.filter, updateUrl]);

  // handle form submission
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      updateUrl(search);
    },
    [search, updateUrl],
  );

  return (
    <Page className={styles.page} backTo={ROUTE.DASHBOARD} title="Event Search">
      <form onSubmit={handleSubmit} className={styles.form}>
        <legend className={styles.legend}>What event are you attending?</legend>

        {/* Search Filter (Select Dropdown) */}
        <Filter
          defaultValue={params.filter}
          onChange={(payload) =>
            dispatch({ type: TYPE.CHANGE_FILTER, payload })
          }
        />

        {/* Search Input (AutoComplete Dropdown) */}
        <Input
          options={search.options}
          value={search.value}
          onChange={(payload) => dispatch({ type: TYPE.CHANGE_VALUE, payload })}
          submit={({ value }) => updateUrl({ ...search, value })}
          disabled={true}
        />

        {/* Needed so ENTER key will submit form */}
        <input type="submit" hidden />
      </form>

      {/* Search Results */}
      <Results results={search.results} isLoading={isLoading} error={error} />
    </Page>
  );
};

export default EventSearch;
