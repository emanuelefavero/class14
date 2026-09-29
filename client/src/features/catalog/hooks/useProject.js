import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { projectSchema } from '../schemas';

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
