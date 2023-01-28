import cx from 'classnames';
import { ReactElement } from 'react';
import { Grid } from '../../sormus';
import LearnMoreBlock, { LearnMoreBlockProps } from './LearnMoreBlock';

interface Props {
  list: LearnMoreBlockProps[];
}

const LearnMore = ({ list }: Props): ReactElement => {
  return (
    <Grid
      Element="ul"
      className={cx(
        'col-main lg:col-start-3 lg:col-end-13',
        'flex flex-wrap gap-14 lg:gap-20',
        'max-w-md mx-auto lg:max-w-none',
      )}
    >
      {list.map((item) => (
        <li
          className="flex-grow-0 flex-shrink-0 w-full lg:flex-1 lg:w-auto"
          key={`learn-more-block-${item.image.src}`}
        >
          <LearnMoreBlock {...item} />
        </li>
      ))}
    </Grid>
  );
};

export default LearnMore;
