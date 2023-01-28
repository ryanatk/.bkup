// TODO: move this to sormus
import { Waypoint as ReactWaypoint } from 'react-waypoint';

interface Props {
  children: any;
  onEnter: () => void;
}

const Waypoint = ({ children, onEnter = () => null }) => (
  <ReactWaypoint
    scrollableAncestor={window}
    bottomOffset="20%"
    topOffset="60%"
    onEnter={onEnter}
  >
    {children}
  </ReactWaypoint>
);
