import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoutriesInfo, selectVisibleCounries, loadCountries } from './countries-slice';
import { selectControls } from '../controls/controls-slice';

export const useCountries = () => {
  const dispatch = useDispatch();

  const controls = useSelector(selectControls);
  const countries = useSelector((state) => selectVisibleCounries(state, controls));
  const { status, error, qty } = useSelector(selectCoutriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};
