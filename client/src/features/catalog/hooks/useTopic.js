import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { topicSchema } from '../schemas';

export const useTopic = (name) => {
  const [state, setState] = useState({ step: 'idle', name });

  useEffect(() => {
    // Ignore a request result if the component unmounts or the topic name changes before it settles. (prevents race conditions)
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

  // Avoid exposing data loaded for the previous topic during the render before this effect restarts.
  if (state.name !== name) return { step: 'loading', name };

  return state;
};
