import { useEffect, useState } from 'react';

export const useCatalogData = (fetcher, parameter) => {
  const [state, setState] = useState({ step: 'idle', parameter });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading', parameter });

    fetcher(parameter)
      .then((data) => {
        if (active) setState({ step: 'success', parameter, data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', parameter, error });
      });

    return () => {
      active = false;
    };
  }, [fetcher, parameter]);

  // Hide the previous response while the next request starts.
  if (state.parameter !== parameter) {
    return { step: 'loading', parameter };
  }

  return state;
};
