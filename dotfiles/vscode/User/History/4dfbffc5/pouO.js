import { useState } from 'react';
import { object, string } from 'prop-types';
import cx from 'classnames';

import { ClickOutside } from 'common/components';

const withWrap =
  (Component) =>
  ({ className, floating, ...props }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <ClickOutside
        className={cx(className)}
        floating={floating || isActive}
        onClick={() => setIsActive(false)}
      >
        <Component {...props} isActive={isActive} setIsActive={setIsActive} />
      </ClickOutside>
    );
  };

withWrap.propTypes = {
  className: string,
  sx: object,
};

withWrap.defaultProps = {
  className: '',
  sx: {},
};

export default withWrap;
