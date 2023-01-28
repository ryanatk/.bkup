import { ReactElement, ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  className?: string;
  children?: ReactNode;
  bottomOffset?: string | number;
  topOffset?: string | number;
  onEnter?: () => void;
  onLeave?: () => void;
  scrollableAncestor?: ReactElement;
  window?: boolean;
}

const Waypoint = ({
  className,
  children,
  bottomOffset,
  topOffset,
  onEnter = () => null,
  onLeave = () => null,
  scrollableAncestor,
}: Props): JSX.Element => {
  return (
    <ReactWaypoint
      scrollableAncestor={scrollableAncestor}
      bottomOffset={bottomOffset}
      topOffset={topOffset}
      onEnter={onEnter}
      onLeave={onLeave}
    >
      <div className={className}>{children}</div>
    </ReactWaypoint>
  );
};

export default Waypoint;
