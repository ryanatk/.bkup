import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Box, Button, Typography } from '../../../sormus';
import styles from './CareersJobBoard.module.scss';

export interface CareerListProps {
  list: Array<{
    name: string;
    count: string | number;
  }>;
  setDetailView: (dept: string) => void;
  currentFilter: string;
  setFilter: (filter: string) => void;
}

export interface CareerDetailsProps {
  department: string;
  details: Array<{
    title: string;
    url: string;
    city: string;
    country: string;
  }>;
  clearDetails: () => void;
}

const CareerList: React.FC<CareerListProps> = ({
  list,
  setDetailView,
  currentFilter,
  setFilter,
}) => {
  const filters = [
    {
      value: null,
      text: 'View All',
    },
    {
      value: 'US',
      text: 'North America',
    },
    {
      value: 'FI',
      text: 'Europe',
    },
  ];

  return (
    <div>
      <div className={styles.careerboard__radios}>
        {filters.map((filter) => (
          <button
            className={
              currentFilter === filter.value
                ? styles['careerboard__radio-button--selected']
                : styles['careerboard__radio-button']
            }
            onClick={() => setFilter(filter.value)}
          >
            {filter.text}
          </button>
        ))}
      </div>
      <div className={styles.careerboard__list}>
        {list ? (
          list.map((dept, index) => (
            <div
              className={styles[`careerboard__list-item`]}
              key={`dept-${index}`}
              onClick={() => setDetailView(dept.name)}
            >
              <div className={styles['careerboard__list-item-text']}>
                <Typography
                  Element="h4"
                  variant="subhead1"
                  className={styles[`careerboard__list-item-title`]}
                >
                  {dept.name}
                </Typography>
                <Typography variant="eyebrow" className="mt-2">
                  {dept.count} Open Roles
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 flex justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

const CareerDetails: React.FC<CareerDetailsProps> = ({
  department,
  details,
  clearDetails,
}) => {
  if (!details) return <></>;

  return (
    <div className="py-8">
      <button onClick={clearDetails} className="mb-8 text-helsinkiBlue">
        &larr; Back to List
      </button>
      <div className="pb-4">
        <Typography Element="h4" variant="subhead1">
          {department} - Open Roles
        </Typography>
      </div>
      <div className={styles.careerboard__list}>
        {details.map((job) => (
          <a
            href={job.url}
            target="_blank"
            className={styles[`careerboard__list-item`]}
            rel="noreferrer"
          >
            <Typography
              Element="h5"
              variant="subhead3"
              className={styles[`careerboard__list-item-title`]}
            >
              {job.title}
            </Typography>
            <Typography variant="eyebrow" className="mt-2">
              {job.city} {job.city && job.country && `-`} {job.country}
            </Typography>
          </a>
        ))}
      </div>
    </div>
  );
};

const CareersJobBoard: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const [detailList, setDetailList] = useState();
  const [department, setDepartment] = useState();
  const [filter, setFilter] = useState(null);

  const topOfComponentRef = useRef(null);

  const buildFilterUrl = (location) => {
    if (location)
      return `https://apply.workable.com/api/v1/widget/accounts/327276?location=${location}`;
    return 'https://apply.workable.com/api/v1/widget/accounts/oura-health-ltd';
  };

  const { data: listData, refetch } = useQuery('careersList', () =>
    fetch(buildFilterUrl(filter)).then((res) => res.json()),
  );

  useEffect(() => {
    refetch();
  }, [filter]);

  const handleSetDetailView = (department) => {
    setDepartment(department);
    if (listData.jobs) {
      const filtered = listData.jobs.filter(
        (job) => job.department === department,
      );
      setDetailList(filtered);
      topOfComponentRef.current.scrollIntoView();
    }
  };

  const handleClearDetails = () => setDetailList(null);
  const handleSetFilter = (val) => setFilter(val);

  const parseListData = (data) => {
    const departments = new Set();

    if (data) {
      data.jobs.forEach((job) => {
        if (job.department) departments.add(job.department);
      });

      const sortedDepartments = Array.from(departments).sort();
      const counts = [];

      sortedDepartments.forEach((dept) => {
        counts.push({
          name: dept,
          count: data.jobs.filter((job) => job.department === dept).length,
        });
      });

      return counts;
    }
  };

  return (
    <Box>
      <div className="pt-32" id="open-positions" ref={topOfComponentRef}></div>

      <Typography variant="super" weight="light" className="w-3/4 md:w-full">
        {t('ready-when-you-are')}
      </Typography>

      <Button
        link={true}
        target="_blank"
        className="my-8"
        href="https://apply.workable.com/oura-health-ltd/"
        rel="nofollow"
      >
        See all positions
      </Button>

      <div className={styles.careerboard}>
        <SwitchTransition>
          <CSSTransition
            key={detailList ? 'details' : 'list'}
            classNames="animation"
            timeout={200}
          >
            <>
              {detailList ? (
                <CareerDetails
                  department={department}
                  details={detailList}
                  clearDetails={handleClearDetails}
                />
              ) : (
                <CareerList
                  list={parseListData(listData)}
                  setDetailView={handleSetDetailView}
                  currentFilter={filter}
                  setFilter={handleSetFilter}
                />
              )}
            </>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </Box>
  );
};

export default CareersJobBoard;
