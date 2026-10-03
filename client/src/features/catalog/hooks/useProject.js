import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';
import { projectSchema } from '../schemas';

export const useProject = (slug) => {
  const [state, setState] = useState({ step: 'idle', slug });

  useEffect(() => {
    // Ignore a request result if the component unmounts or the slug changes before it settles. (prevents race conditions)
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

  // Avoid exposing data loaded for the previous slug during the render before this effect restarts.
  if (state.slug !== slug) return { step: 'loading', slug };

  return state;
};
