import { ReactElement } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  children: ReactElement;
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
    {children}
  </ReactWaypoint>
);

export default Waypoint;
