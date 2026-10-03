import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MaterialLinks, TopicLinks } from '@/components/shared/CatalogContent';
import { CatalogTitle } from '@/components/shared/CatalogIcon';
import { CatalogState } from '@/components/shared/CatalogState';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { getProjectIcon } from '@/features/catalog/catalogIcons';
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
      <header className='catalog-heading catalog-detail-heading'>
        <Breadcrumb
          items={[
            { label: 'Home', to: paths.home },
            { label: 'Progetti', to: paths.projects },
            { label: data.title },
          ]}
        />
        <p className='catalog-eyebrow'>Progetto · {data.slug}</p>
        <h1>
          <CatalogTitle icon={getProjectIcon(data.slug)} size='heading'>
            {data.title}
          </CatalogTitle>
        </h1>
        <TopicLinks topics={data.topics} />
        <dl className='catalog-detail-metrics'>
          <div>
            <dt>Repository</dt>
            <dd>{data.students.length}</dd>
          </div>
          <div>
            <dt>Cheat sheet</dt>
            <dd>{data.cheatsheets.length}</dd>
          </div>
          <div>
            <dt>Risorse</dt>
            <dd>{data.resources.length}</dd>
          </div>
        </dl>
      </header>

      <div className='catalog-detail-layout'>
        <div className='catalog-detail-main'>
          {data.description && (
            <section
              className='catalog-section catalog-detail-surface'
              aria-label='Descrizione del progetto'
            >
              <p className='catalog-eyebrow'>Brief del progetto</p>
              <div className='catalog-markdown'>
                <Markdown
                  skipHtml
                  // Tip: scale heading levels for better accessibility: h1=h2
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
            <div className='catalog-section-heading'>
              <h2>Repository disponibili</h2>
              <span>{data.students.length} verificate</span>
            </div>
            {data.students.length ? (
              <ul className='catalog-list catalog-repository-list'>
                {data.students.map((student) => (
                  <li className='catalog-row' key={student.id}>
                    <div className='catalog-person'>
                      <StudentAvatar student={student} />
                      <div>
                        <Link
                          className='catalog-row-title'
                          to={getPath.student(student.github_username)}
                        >
                          {student.name}
                        </Link>
                        <p className='catalog-meta'>
                          @{student.github_username}
                        </p>
                      </div>
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
        </div>

        <aside className='catalog-detail-aside'>
          <section className='catalog-section'>
            <div className='catalog-section-heading'>
              <h2>Materiali collegati</h2>
            </div>
            <MaterialLinks
              cheatsheets={data.cheatsheets}
              resources={data.resources}
            />
            <div className='catalog-actions'>
              <Link className='link' to={paths.cheatsheets}>
                Tutti i cheat sheet
              </Link>
              <Link className='link' to={paths.resources}>
                Tutte le risorse
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
};
