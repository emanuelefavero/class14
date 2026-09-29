import { Link, useParams } from 'react-router';
import { TopicLinks } from '@/components/shared/CatalogContent';
import { CatalogState } from '@/components/shared/CatalogState';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { fetchStudent } from '@/features/catalog/api';
import { useCatalogData } from '@/features/catalog/useCatalogData';
import { getPath, paths } from '@/router/paths';
import '../Catalog.css';

export const Student = () => {
  const { github_username } = useParams();
  const { data, error, loading } = useCatalogData(
    fetchStudent,
    github_username,
  );

  if (loading || error) {
    return (
      <div className='catalog-page'>
        <CatalogState
          loading={loading}
          error={error}
          subject='dello studente'
        />
      </div>
    );
  }

  return (
    <article className='catalog-page'>
      <header className='catalog-heading'>
        <Link className='catalog-back' to={paths.students}>
          ← Tutti gli studenti
        </Link>
        <p className='catalog-eyebrow'>Studente · WDPT14</p>
        <div className='catalog-person'>
          <StudentAvatar key={data.github_username} student={data} />
          <h1>{data.name}</h1>
        </div>
        <p>
          @{data.github_username} · {data.repository_count}{' '}
          {data.repository_count === 1
            ? 'repository disponibile'
            : 'repository disponibili'}
        </p>
        <a
          className='link'
          href={data.github_url}
          target='_blank'
          rel='noreferrer'
        >
          Profilo GitHub ↗
        </a>
        {data.topics.length > 0 && <TopicLinks topics={data.topics} />}
      </header>

      <section className='catalog-section'>
        <h2>Progetti con repository disponibili</h2>
        {data.projects.length ? (
          <ul className='catalog-list'>
            {data.projects.map((project) => (
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
                <a
                  className='link'
                  href={project.repo_url}
                  target='_blank'
                  rel='noreferrer'
                >
                  Apri repository ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className='catalog-muted'>
            Nessuna repository pubblica verificata nel catalogo per questo
            studente.
          </p>
        )}
      </section>
    </article>
  );
};
