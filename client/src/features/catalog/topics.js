import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { topicSchema, topicsSchema } from './schemas';

export const useTopics = () => {
  const [state, setState] = useState({ step: 'idle' });

  useEffect(() => {
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

export const useTopic = (name) => {
  const [state, setState] = useState({ step: 'idle', name });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading', name });

    const encodedName = encodeURIComponent(name);

    fetchData(`/api/topics/${encodedName}`)
      .then((data) => topicSchema.parse(data))
      .then((data) => {
        if (active) setState({ step: 'success', name, data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', name, error });
      });

    return () => {
      active = false;
    };
  }, [name]);

  if (state.name !== name) return { step: 'loading', name };

  return state;
};
