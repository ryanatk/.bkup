import { ReactElement, ReactNode } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  window?: boolean;
  className?: string;
  children: ReactNode;
  bottomOffset?: string | number;
  topOffset?: string | number;
  onEnter?: () => void;
  onLeave?: () => void;
  scrollableAncestor: ReactElement;
}

const Waypoint = (props: Props): JSX.Element => {
  const {
    className,
    children,
    bottomOffset = '20%',
    topOffset = '60%',
    onEnter = () => null,
    onLeave = () => null,
    scrollableAncestor,
    window: windowAncestor,
  } = props;

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
