import cx from 'classnames';
import { ElementType, ReactElement } from 'react';
import { Typography } from '../../../sormus';

interface Props {
  title: string | ReactElement;
  paragraphs?: string[] | ReactElement[];
  icon?: ElementType;
}

const Slide = ({ title, paragraphs = [], icon: Icon }: Props): JSX.Element => (
  <div>
    {Icon && <Icon alt="" />}

    <Typography
      Element="h3"
      variant="h6"
      color="inherit"
      weight="normal"
      className={cx({
        'my-3': Icon,
        'mb-3': !Icon,
      })}
    >
      {title}
    </Typography>

    {paragraphs.map((text, i) => (
      <Typography color="inherit" key={title + i}>
        {text}
      </Typography>
    ))}
  </div>
);

export default Slide;