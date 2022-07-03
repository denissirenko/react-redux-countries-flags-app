import { useDetails } from './use-details';

import { Info } from './Info';

export const CountryDetails = ({ name = '', navigate }) => {
  const { currentCountry, error, status } = useDetails(name);

  return (
    <>
      {error && <h2>Can't fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
