import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { projectSchema, projectsSchema } from './schemas';

export const useProjects = (search, topic) => {
  const [state, setState] = useState({ step: 'idle', search, topic });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading', search, topic });

    const params = {};
    if (search) params.q = search;
    if (topic) params.topic = topic;

    fetchData('/api/projects', params)
      .then((data) => projectsSchema.parse(data))
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

export const useProject = (slug) => {
  const [state, setState] = useState({ step: 'idle', slug });

  useEffect(() => {
    let active = true;
    setState({ step: 'loading', slug });

    const encodedSlug = encodeURIComponent(slug);

    fetchData(`/api/projects/${encodedSlug}`)
      .then((data) => projectSchema.parse(data))
      .then((data) => {
        if (active) setState({ step: 'success', slug, data });
      })
      .catch((error) => {
        if (active) setState({ step: 'error', slug, error });
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (state.slug !== slug) return { step: 'loading', slug };

  return state;
};
