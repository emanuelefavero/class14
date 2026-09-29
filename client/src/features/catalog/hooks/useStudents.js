import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { studentsSchema } from '../schemas';

export const useStudents = (search, topic) => {
  const [state, setState] = useState({ step: 'idle', search, topic });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading', search, topic });

    const params = {};
    if (search) params.q = search;
    if (topic) params.topic = topic;

    fetchData('/api/students', params)
      .then((data) => studentsSchema.parse(data))
      .then((data) => {
        if (active) setState({ step: 'success', search, topic, data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', search, topic, error });
      });

    return () => {
      active = false;
    };
  }, [search, topic]);

  if (state.search !== search || state.topic !== topic) {
    return { step: 'loading', search, topic };
  }

  return state;
};
