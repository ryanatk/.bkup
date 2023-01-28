import { ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  children: ReactNode;
  bottomOffset?: string;
  topOffset?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

const Waypoint = ({
  children,
  bottomOffset = '20%',
  topOffset = '60%',
  onEnter = () => null,
  onLeave = () => null,
}: Props): JSX.Element => (
  <ReactWaypoint
    scrollableAncestor={window}
    bottomOffset={bottomOffset}
    topOffset={topOffset}
    onEnter={onEnter}
    onLeave={onLeave}
  >
    <div>{children}</div>
  </ReactWaypoint>
);

export default Waypoint;
