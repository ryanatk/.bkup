import merge from 'lodash/merge';
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
  window,
}: Props): JSX.Element => {
  const props = merge(
    {},
    {
      className,
      children,
      bottomOffset,
      topOffset,
      onEnter,
      onLeave,
      scrollableAncestor,
    },
  );

  return (
    <ReactWaypoint {...props}>
      <div className={className}>{children}</div>
    </ReactWaypoint>
  );
};

export default Waypoint;
