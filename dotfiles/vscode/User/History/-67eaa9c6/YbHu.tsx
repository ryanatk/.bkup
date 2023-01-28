import { ReactElement, ReactNode, useState } from 'react';
import { config, useSpring } from 'react-spring';
import { MessageKey } from '../../../public/locales/setup';
import { Grid } from '../../sormus';
import LearnMoreBlock, { LearnMoreBlockProps } from './LearnMoreBlock';

interface Props {
  eyebrow?: MessageKey;
  title?: ReactNode;
  list: LearnMoreBlockProps[];
  children?: ReactNode;
}

const LearnMore = ({ eyebrow, title, list, children }: Props): ReactElement => {
  const [titleVisible, setTitleVisible] = useState(false);

  const titleSpring =
    useSpring({
      opacity: titleVisible ? 1 : 0,
      transform: `translate3d(0, ${titleVisible ? '0' : '15%'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

  return (
    <Grid
      Element="ul"
      className="col-main lg:col-start-3 lg:col-end-13 flex flex-wrap gap-14 max-w-md mx-auto lg:(gap-20 max-w-none)"
    >
      {list.map((item) => (
        <li
          className="flex-grow-0 flex-shrink-0 w-full lg:(flex-1 w-auto)"
          key={`learn-more-block-${item.image.src}`}
        >
          <LearnMoreBlock {...item} />
        </li>
      ))}
    </Grid>
  );
};

export default LearnMore;
