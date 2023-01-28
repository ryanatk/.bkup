import { AccoladesProps } from '.';
import Typography from '../Typography';

const Accolades = ({ accolades, isABTest }: AccoladesProps) => {
  if (!accolades) return null;
  return (
    <>
      {accolades.map((accolade) => (
        <div key={accolade.alt} className="p-4 md:w-1/2 lg:w-1/4">
          <Typography Element="h3" className="mb-5 flex items-end h-10">
            <img
              {...accolade.src}
              style={{ maxWidth: '75%' }}
              className="mx-auto w-auto max-h-full"
              alt={accolade.alt}
              loading="lazy"
              width="330"
              height="50"
            />
          </Typography>
          <Typography
            color={isABTest ? 'text-helsinkiBlue' : 'white'}
            align="center"
          >
            &lsquo;{accolade.content}&rsquo;
          </Typography>
        </div>
      ))}
    </>
  );
};

export default Accolades;
