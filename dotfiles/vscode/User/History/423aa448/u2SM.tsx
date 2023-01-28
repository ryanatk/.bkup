import { Typography } from '../../../sormus';
import { TypographyElement } from '../../../sormus/Typography';

interface Props {
  color: string;
  variant: TypographyElement;
  children: any;
}

const Subtitle = ({ variant = 'h6', color, children }: Props): JSX.Element => (
  <div className="col-start-2 col-main md:col-start-8 md:col-end-13">
    <Typography variant={variant} color={color}>
      {children}
    </Typography>
  </div>
);

export default Subtitle;
