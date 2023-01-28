import cx from 'classnames';

interface Props {
  className: string;
  children: any;
}

const Section = ({ className, children }) => {
  return (
    <section className={cx(className, 'py-20 lg:(py-24)')}>{children}</section>
  );
};

export default Section;
