import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoutriesInfo, selectVisibleCounries } from '../store/countries/countries-selectors';
import { loadCountries } from '../store/countries/countries-actions';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { selectSearch } from '../store/controls/controls-selectors';

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useSelector(selectSearch);
  const countries = useSelector((state) => selectVisibleCounries(state, { search }));
  const { status, error, qty } = useSelector(selectCoutriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />

      {error && <h2>Can't fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return (
              <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />
            );
          })}
        </List>
      )}
    </>
  );
};
