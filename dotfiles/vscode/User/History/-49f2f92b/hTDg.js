import { node } from 'prop-types';
import { Paper } from '@mui/material';
import cx from 'classnames';

import { BACKGROUND, TEXT } from 'common/const';
import { Scrollbar } from 'common/components';

import { Logo, Footer } from '../components';

import styles from './IslandPage.module.css';

const IslandPage = ({ className, title, subtitle, children }) => {
  return (
    <div className={cx(BACKGROUND.GREY_50, styles.page)}>
      <Paper className={styles.paper}>
        <header className={styles.logo}>
          <Logo />
        </header>

        <main className={className}>
          {title ? (
            <div className={styles.heading}>
              <h1 className={TEXT.H5}>{title}</h1>
              <p className={cx(TEXT.BODY_1, styles.subtitle)}>{subtitle}</p>
            </div>
          ) : null}
          {children}
        </main>
      </Paper>

      <Footer className={styles.footer} />
    </div>
  );
};

IslandPage.propTypes = {
  children: node,
};

export default IslandPage;
