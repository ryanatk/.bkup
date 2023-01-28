import { ReactElement, useState } from 'react';
import { a, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Typography from '../Typography';

export interface StatData {
  value: number;
  unit: string;
  label: MessageKey;
  footnoteCharacter?: string;
}

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

      <Typography color="inherit" className="font-light text-4xl">
        <a.span>{statSpring.value.to((n) => Math.floor(n))}</a.span>
        <span>{unit}</span>
      </Typography>

      <Typography color="inherit" className="max-w-[164px] text-base">
        {t(label, {
          footnoteLink: (
            <sup>
              <a href="#legal-footnotes">{footnoteCharacter}</a>
            </sup>
          ),
        })}
      </Typography>
    </div>
  );
};

export default Stat;
