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
  onNav,
}: SectionsListProps): ReactElement => (
  <ul className={className}>
    {Object.values(SECTION).map((section: SectionProps) => (
      <li key={section.id} className={itemClassName}>
        <SectionLink section={section} onClick={onNav} />
      </li>
    ))}
  </ul>
);

export default SectionsList;
