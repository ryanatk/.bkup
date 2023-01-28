import cx from 'classnames';
import { ReactElement } from 'react';
import LearnMoreBlock, { LearnMoreBlockProps } from './LearnMoreBlock';

interface Props {
  list: LearnMoreBlockProps[];
}

const LearnMore = ({ list }: Props): ReactElement => {
  return (
    <ul
      className={cx(
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
    </ul>
  );
};

export default LearnMore;
