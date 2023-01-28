import merge from 'lodash/merge';
import { ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props extends ReactWaypoint.WaypointProps {
  className?: string;
  children?: ReactNode;
  window?: boolean; // flag to use consistent config w/ scrollableAncester={window}
}

const Waypoint = ({
  className,
  children,
  window: isWindow,
  ...waypointProps
}: Props): JSX.Element => (
  <ReactWaypoint
    {...merge(
      {},
      isWindow && {
        scrollableAncestor: window,
        bottomOffset: '20%',
        topOffset: '60%',
      },
      waypointProps,
    )}
  >
    <div className={className}>{children}</div>
  </ReactWaypoint>
);

export default Waypoint;