import { func, number } from 'prop-types';
import cx from 'classnames';

import { Icon, Loading } from 'common/components';
import { TEXT } from 'common/const';
import { useClick } from 'common/hooks';

import { HeaderButton } from '../components';

import styles from './ToggleCartButton.module.css';

const ToggleCartButton = ({ toggleCart, count, isLoading }) => {
  const { onClick } = useClick({ onClick: toggleCart });

  return (
    <HeaderButton
      className={cx(styles.button)}
      onClick={onClick}
      track="view_cart"
    >
      <Icon name="cart" />{' '}
      {
        <span className={TEXT.SUBTITLE}>
          {isLoading ? <Loading size="button" /> : count > 99 ? '99+' : count}
        </span>
      }
    </HeaderButton>
  );
};

ToggleCartButton.propTypes = {
  count: number,
  toggleCart: func,
};

ToggleCartButton.defaultProps = {
  count: '?',
};

export default ToggleCartButton;
