import { ReactElement } from 'react';
import SECTION, { SectionProps } from '../data/section';
import SectionLink from './SectionLink';

interface SectionsListProps {
  className?: string;
  itemClassName?: string;
}

const SectionsList = ({
  className,
  itemClassName,
}: SectionsListProps): ReactElement => (
  <ul className={className}>
    {Object.values(SECTION).map((section: SectionProps) => (
      <li key={section.id} className={itemClassName}>
        <SectionLink section={section} />
      </li>
    ))}
  </ul>
);

export default SectionsList;
