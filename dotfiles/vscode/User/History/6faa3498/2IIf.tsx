import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Em = ({ children }: Props): JSX.Element => (
  <em className="font-serif">{children}</em>
);

export default Em;
