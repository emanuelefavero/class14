import { ExternalLink, FileText, Library } from 'lucide-react';
import { Link } from 'react-router';
import { getProjectIcon } from '@/features/catalog/catalogIcons';
import { getPath } from '@/router/paths';
import { CatalogTitle } from './CatalogIcon';

export const TopicLinks = ({ topics }) => (
  <ul className='catalog-tags' aria-label='Argomenti'>
    {topics.map((topic) => (
      <li key={topic}>
        <Link to={getPath.topic(topic)}>{topic}</Link>
      </li>
    ))}
  </ul>
);

export const ProjectTitleLink = ({
  project,
  className = 'catalog-row-title',
  iconSize = 'row',
}) => (
  <Link className={className} to={getPath.project(project.slug)}>
    <CatalogTitle icon={getProjectIcon(project.slug)} size={iconSize}>
      {project.title}
    </CatalogTitle>
  </Link>
);

export const ProjectList = ({ projects }) => (
  <ul className='catalog-list'>
    {projects.map((project) => (
      <li className='catalog-row' key={project.id}>
        <div>
          <ProjectTitleLink project={project} />
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
      <h3>
        <span className='catalog-material-title'>
          <FileText aria-hidden='true' /> Cheat sheet
        </span>
        <small>{cheatsheets.length}</small>
      </h3>
      {cheatsheets.length ? (
        <ul className='catalog-link-list'>
          {cheatsheets.map((sheet) => (
            <li key={sheet.id}>
              <a href={sheet.file_path} target='_blank' rel='noreferrer'>
                {sheet.title} <ExternalLink aria-hidden='true' />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className='catalog-muted'>Nessun cheat sheet collegato.</p>
      )}
    </section>
    <section>
      <h3>
        <span className='catalog-material-title'>
          <Library aria-hidden='true' /> Risorse
        </span>
        <small>{resources.length}</small>
      </h3>
      {resources.length ? (
        <ul className='catalog-link-list'>
          {resources.map((resource) => (
            <li key={resource.id}>
              <a href={resource.url} target='_blank' rel='noreferrer'>
                {resource.title} <ExternalLink aria-hidden='true' />
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
