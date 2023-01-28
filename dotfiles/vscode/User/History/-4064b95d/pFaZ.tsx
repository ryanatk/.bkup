// TODO: move this to sormus
import { ReactElement } from 'react';
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  children: ReactElement;
  onEnter: () => void;
}

const Waypoint = ({ children, onEnter = () => null }: Props): JSX.Element => (
  <ReactWaypoint
    scrollableAncestor={window}
    bottomOffset="20%"
    topOffset="60%"
    onEnter={onEnter}
  >
    {children}
  </ReactWaypoint>
);

export default Waypoint;
