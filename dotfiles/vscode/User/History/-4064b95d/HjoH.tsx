import { ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  className?: string;
  children: ReactNode;
  bottomOffset?: string | number;
  topOffset?: string | number;
  onEnter?: () => void;
  onLeave?: () => void;
}

const Waypoint = ({
  className,
  children,
  bottomOffset = '0px',
  topOffset = '0px',
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
    <div className={className}>{children}</div>
  </ReactWaypoint>
);

export default Waypoint;
