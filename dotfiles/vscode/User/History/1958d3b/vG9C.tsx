import Typography, { TypographyProps } from '../../../sormus/Typography';

const Typ = ({
  color = 'helsinkiBlue',
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography color={color} {...props}>
      {children}
    </Typography>
  );
};

export default Typ;
