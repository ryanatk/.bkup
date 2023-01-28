import { ReactElement } from 'react';
import SECTION, { SectionProps } from '../data/section';
import SectionLink from './SectionLink';

interface SectionsListProps {
  className?: string;
  itemClassName?: string;
  onNav?: () => void; // optional callback to pass to SectionLink (can't get `hashChangeStart` to fire)
}

const SectionsList = ({
  className,
  itemClassName,
  ...props
}: SectionsListProps): ReactElement => (
  <ul className={className}>
    {Object.values(SECTION).map((section: SectionProps) => (
      <li key={section.id} className={itemClassName}>
        <SectionLink section={section} {...props} />
      </li>
    ))}
  </ul>
);

export default SectionsList;
