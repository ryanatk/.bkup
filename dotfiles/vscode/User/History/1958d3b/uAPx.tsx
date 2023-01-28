import { ReactElement } from 'react';
import Typography, { TypographyProps } from '../../../sormus/Typography';

/**
 * Business page uses a different default color,
 * so we create this custom component.
 */

const Typ = ({
  color = 'helsinkiBlue',
  children,
  ...props
}: TypographyProps): ReactElement => {
  return (
    <Typography color={color} {...props}>
      {children}
    </Typography>
  );
};

export default Typ;
