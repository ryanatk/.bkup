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
