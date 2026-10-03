import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { studentSchema } from '../schemas';

export const useStudent = (username) => {
  const [state, setState] = useState({ step: 'idle', username });

  useEffect(() => {
    // Ignore a request result if the component unmounts or the username changes before it settles. (prevents race conditions)
    let active = true;
    setState({ step: 'loading', username });

    const encodedUsername = encodeURIComponent(username);

    fetchData(`/api/students/${encodedUsername}`)
      .then((data) => studentSchema.parse(data))
      .then((data) => {
        if (active) setState({ step: 'success', username, data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', username, error });
      });

    return () => {
      active = false;
    };
  }, [username]);

  // Avoid exposing data loaded for the previous username during the render before this effect restarts.
  if (state.username !== username) return { step: 'loading', username };

  return state;
};
