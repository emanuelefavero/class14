import { Link } from 'react-router';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { useStudents } from '@/features/catalog/hooks/useStudents';
import { useTopics } from '@/features/catalog/hooks/useTopics';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Students = () => {
  const { search, topic, updateFilters } = useCatalogFilters();
  const catalog = useStudents(search, topic);
  const topics = useTopics();

  const render = () => {
    switch (catalog.step) {
      case 'idle':
      case 'loading':
      case 'error':
        return <CatalogState state={catalog} subject='degli studenti' />;

      case 'success':
        if (catalog.data.length === 0) {
          return (
            <p className='catalog-muted'>
              {search || topic
                ? 'Nessuno studente corrisponde ai filtri selezionati.'
                : 'Nessuno studente nel catalogo.'}
            </p>
          );
        }

        return (
          <ul className='catalog-list'>
            {catalog.data.map((student) => (
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
                    <p className='catalog-meta'>@{student.github_username}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Le persone · WDPT14</p>
        <h1>Studenti</h1>
        <p>
          Scopri i profili della classe e le repository pubbliche collegate ai
          progetti.
        </p>
      </header>
      <section className='catalog-results' aria-label='Catalogo studenti'>
        <CatalogFilters
          search={search}
          topic={topic}
          topics={topics.step === 'success' ? topics.data : []}
          topicError={topics.step === 'error'}
          topicLoading={topics.step === 'idle' || topics.step === 'loading'}
          searchLabel='Cerca per nome o username'
          resultCount={catalog.step === 'success' ? catalog.data.length : null}
          onChange={updateFilters}
        />
        {render()}
      </section>
    </div>
  );
};
