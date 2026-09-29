import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router';
import { MaterialLinks, TopicLinks } from '@/components/shared/CatalogContent';
import { CatalogState } from '@/components/shared/CatalogState';
import { useProject } from '@/features/catalog/hooks/useProject';
import { getPath, paths } from '@/router/paths';
import '../Catalog.css';

export const Project = () => {
  const { slug } = useParams();
  const state = useProject(slug);

  if (state.step !== 'success') {
    return (
      <div className='catalog-page'>
        <CatalogState state={state} subject='del progetto' />
      </div>
    );
  }

  const { data } = state;

  return (
    <article className='catalog-page'>
      <header className='catalog-heading'>
        <Link className='catalog-back' to={paths.projects}>
          ← Tutti i progetti
        </Link>
        <p className='catalog-eyebrow'>Progetto · {data.slug}</p>
        <h1>{data.title}</h1>
        <TopicLinks topics={data.topics} />
      </header>

      {data.description && (
        <section
          className='catalog-section'
          aria-label='Descrizione del progetto'
        >
          <div className='catalog-markdown'>
            <Markdown
              skipHtml
              components={{
                h1: ({ children }) => <h2>{children}</h2>,
                h2: ({ children }) => <h3>{children}</h3>,
                h3: ({ children }) => <h4>{children}</h4>,
              }}
            >
              {data.description}
            </Markdown>
          </div>
        </section>
      )}

      <section className='catalog-section'>
        <h2>Repository disponibili</h2>
        {data.students.length ? (
          <ul className='catalog-list'>
            {data.students.map((student) => (
              <li className='catalog-row' key={student.id}>
                <div>
                  <Link
                    className='catalog-row-title'
                    to={getPath.student(student.github_username)}
                  >
                    {student.name}
                  </Link>
                  <p className='catalog-meta'>@{student.github_username}</p>
                </div>
                <a
                  className='link'
                  href={student.repo_url}
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
            Nessuna repository pubblica verificata per questo progetto.
          </p>
        )}
      </section>

      <section className='catalog-section'>
        <h2>Materiali collegati</h2>
        <MaterialLinks
          cheatsheets={data.cheatsheets}
          resources={data.resources}
        />
        <p>
          <Link className='link' to={paths.cheatsheets}>
            Tutti i cheat sheet
          </Link>{' '}
          ·{' '}
          <Link className='link' to={paths.resources}>
            Tutte le risorse
          </Link>
        </p>
      </section>
    </article>
  );
};
