import cx from 'classnames';
import { ReactElement } from 'react';
import { Grid, List, ListItem } from '../../sormus';

interface FootnoteProps {
  marker: string;
  children: string | ReactElement;
}

const Footnote = ({ marker, children }: FootnoteProps) => {
  return (
    <ListItem
      color="grayscale-text"
      weight="normal"
      className="mt-0 mb-1 text-sm"
    >
      <sup>{marker}</sup>
      <span>{children}</span>
    </ListItem>
  );
};

const FsaFootnotes = (): JSX.Element => {
  return (
    <div id="footnotes" className={cx('bg-sand pt-24')}>
      <Grid>
        <div className="border-t border-b border-grayscale-medium col-main pt-6 pb-5 lg:col-start-3 lg:col-end-13">
          <List type="ol" unstyled>
            <Footnote marker="**">
              Oura Ring is not a medical device. It is not intended to diagnose,
              treat, cure, or prevent any disease or health condition.
            </Footnote>
          </List>
        </div>
      </Grid>
    </div>
  );
};

export default FsaFootnotes;
