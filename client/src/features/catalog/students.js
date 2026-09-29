import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { studentSchema, studentsSchema } from './schemas';

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

export const useStudent = (username) => {
  const [state, setState] = useState({ step: 'idle', username });

  useEffect(() => {
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

  if (state.username !== username) return { step: 'loading', username };

  return state;
};
