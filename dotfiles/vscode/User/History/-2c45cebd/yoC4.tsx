import { ReactElement, useState } from 'react';
import { useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { MessageKey } from '../../../public/locales/setup';

export interface StatData {
  value: number;
  unit: string;
  label: MessageKey;
  footnoteCharacter?: string;
}

const StatValue = tw(Typography)`
  font-light
  text-4xl
`;

const StatLabel = tw(Typography)`
  max-w-[164px]
  text-base
`;

const Stat = ({
  value,
  unit,
  label,
  footnoteCharacter,
}: StatData): ReactElement => {
  const [statVisible, setStatVisible] = useState(false);
  const statSpring = useSpring({
    value: statVisible ? value : 0,
    config: { duration: 400 },
  });
  return (
    <div className="flex-shrink-0">
      <Waypoint
        bottomOffset="10%"
        onEnter={() => {
          if (!statVisible) setStatVisible(true);
        }}
      />

      <Typ className="font-light text-4xl">
        <a.span>{statSpring.value.to((n) => Math.floor(n))}</a.span>
        <span>{unit}</span>
      </Typ>

      <StatLabel color="inherit">
        {t(label, {
          footnoteLink: (
            <sup>
              <a href="#legal-footnotes">{footnoteCharacter}</a>
            </sup>
          ),
        })}
      </StatLabel>
    </div>
  );
};

export default Stat;
