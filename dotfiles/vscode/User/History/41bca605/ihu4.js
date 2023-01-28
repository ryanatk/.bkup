import { bool, func, string } from 'prop-types';
import cx from 'classnames';
import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { COLOR, TEXT } from 'common/const';
import { Icon, RouterLink } from 'common/components';
import { useClick } from 'common/hooks';
import { scrollToTop } from 'common/utils';

import styles from './ListItem.module.css';

const ListItem = ({ active, className, icon, text, to, onClick }) => {
  const { onClick: handleClick } = useClick({ onClick });

  return (
    <MuiListItem disablePadding className={cx(styles.item, className)}>
      <ListItemButton
        component={RouterLink}
        to={to}
        onClick={() => {
          handleClick();
          // scrollToTop();
        }}
        className={cx({ [styles.active]: active }, styles.button)}
        aria-selected={active}
      >
        <ListItemIcon className={cx(styles.icon)}>
          <Icon name={icon} size="small" />
        </ListItemIcon>
        <ListItemText
          primary={text}
          disableTypography
          className={cx(TEXT.BUTTON, COLOR.TEXT, styles.text)}
        />
      </ListItemButton>
    </MuiListItem>
  );
};

ListItem.propTypes = {
  active: bool,
  className: string,
  icon: string,
  text: string,
  to: string,
  onClick: func,
};

export default ListItem;
