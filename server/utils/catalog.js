export const compareText = (left, right) =>
  left.localeCompare(right, 'en', { sensitivity: 'base' });

export const compareProjects = (left, right) =>
  compareText(left.title, right.title) || compareText(left.slug, right.slug);

export const compareTopics = (left, right) => {
  const comparison = compareText(left, right);
  if (comparison !== 0) return comparison;

  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
};

/**
 * Converts comma-separated topics into sorted arrays without empty or duplicate tags.
 * Pass projects ordered by ID: the first spelling of a tag is reused across projects,
 * ignoring case. Other project fields are preserved; the input is not modified.
 *
 * @example
 * // Input:
 * normalizeProjectTopics([
 *   { id: 1, topics: ' React, react, Node.js, ' },
 *   { id: 2, topics: 'REACT, MySQL' },
 *   { id: 3, topics: null },
 * ]);
 * // Output:
 * // [
 * //   { id: 1, topics: ['Node.js', 'React'] },
 * //   { id: 2, topics: ['MySQL', 'React'] },
 * //   { id: 3, topics: [] },
 * // ]
 */
export const normalizeProjectTopics = (projects) => {
  const canonicalTopics = new Map();

  return projects.map((project) => {
    const topics = new Set();
    const topicsText = project.topics ?? '';
    const topicValues = topicsText.split(',');

    for (const value of topicValues) {
      const topic = value.trim();
      if (!topic) continue;

      const key = topic.toLowerCase();
      if (!canonicalTopics.has(key)) {
        canonicalTopics.set(key, topic);
      }

      const canonicalTopic = canonicalTopics.get(key);
      topics.add(canonicalTopic);
    }

    const uniqueTopics = [...topics];
    const sortedTopics = uniqueTopics.sort(compareTopics);

    return { ...project, topics: sortedTopics };
  });
};
