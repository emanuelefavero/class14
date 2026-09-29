import { Link } from 'react-router';
import { getPath } from '@/router/paths';

export const TopicLinks = ({ topics }) => (
  <ul className='catalog-tags' aria-label='Argomenti'>
    {topics.map((topic) => (
      <li key={topic}>
        <Link to={getPath.topic(topic)}>{topic}</Link>
      </li>
    ))}
  </ul>
);

export const ProjectList = ({ projects }) => (
  <ul className='catalog-list'>
    {projects.map((project) => (
      <li className='catalog-row' key={project.id}>
        <div>
          <Link
            className='catalog-row-title'
            to={getPath.project(project.slug)}
          >
            {project.title}
          </Link>
          <p className='catalog-meta'>{project.slug}</p>
        </div>
        <TopicLinks topics={project.topics} />
      </li>
    ))}
  </ul>
);

export const MaterialLinks = ({ cheatsheets, resources }) => (
  <div className='catalog-columns'>
    <section>
      <h3>Cheat sheet</h3>
      {cheatsheets.length ? (
        <ul className='catalog-link-list'>
          {cheatsheets.map((sheet) => (
            <li key={sheet.id}>
              <a href={sheet.file_path} target='_blank' rel='noreferrer'>
                {sheet.title} <span aria-hidden='true'>↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className='catalog-muted'>Nessun cheat sheet collegato.</p>
      )}
    </section>
    <section>
      <h3>Risorse</h3>
      {resources.length ? (
        <ul className='catalog-link-list'>
          {resources.map((resource) => (
            <li key={resource.id}>
              <a href={resource.url} target='_blank' rel='noreferrer'>
                {resource.title} <span aria-hidden='true'>↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className='catalog-muted'>Nessuna risorsa collegata.</p>
      )}
    </section>
  </div>
);
