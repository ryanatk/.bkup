import merge from 'lodash/merge';
import { ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  className?: string;
  children?: ReactNode;
  window?: boolean; // flag to use consistent config w/ scrollableAncester={window}
}

const Waypoint = ({ className, children, ...props }: Props): JSX.Element => {
  console.log({ props });

  return (
    <ReactWaypoint
      {...merge(
        {},
        props.window && {
          scrollableAncestor: window,
          bottomOffset: '20%',
          topOffset: '60%',
        },
        props,
      )}
    >
      <div className={className}>{children}</div>
    </ReactWaypoint>
  );
};

export default Waypoint;
