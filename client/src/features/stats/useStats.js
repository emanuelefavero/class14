import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { statsSchema } from './schemas';

export const useStats = () => {
  const [state, setState] = useState({ step: 'idle' });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading' });

    fetchData('/api/stats')
      .then((data) => statsSchema.parse(data))
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
