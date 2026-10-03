import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { topicsSchema } from '../schemas';

export const useTopics = () => {
  const [state, setState] = useState({ step: 'idle' });

  useEffect(() => {
    // Ignore the request result if the component unmounts before it settles.
    let active = true;
    setState({ step: 'loading' });

    fetchData('/api/topics')
      .then((data) => topicsSchema.parse(data))
      .then((data) => {
        if (active) setState({ step: 'success', data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', error });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
};
