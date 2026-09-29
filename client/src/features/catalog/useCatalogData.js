import { useEffect, useState } from 'react';

export const useCatalogData = (fetcher, parameter) => {
  const [state, setState] = useState({
    parameter,
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    fetcher(parameter)
      .then((data) => {
        if (active) setState({ parameter, data, error: null, loading: false });
      })
      .catch((error) => {
        if (active) setState({ parameter, data: null, error, loading: false });
      });

    return () => {
      active = false;
    };
  }, [fetcher, parameter]);

  if (state.parameter !== parameter) {
    return { data: null, error: null, loading: true };
  }

  return state;
};
