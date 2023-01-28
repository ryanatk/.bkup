import { ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  children: ReactNode;
  onEnter?: () => void;
  onLeave?: () => void;
}

const Waypoint = ({
  children,
  onEnter = () => null,
  onLeave = () => null,
}: Props): JSX.Element => (
  <ReactWaypoint
    scrollableAncestor={window}
    bottomOffset="20%"
    topOffset="60%"
    onEnter={onEnter}
    onLeave={onLeave}
  >
    <div>{children}</div>
  </ReactWaypoint>
);

export default Waypoint;
