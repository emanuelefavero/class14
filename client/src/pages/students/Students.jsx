import { Link } from 'react-router';
import { CatalogState } from '@/components/shared/CatalogState';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { fetchStudents } from '@/features/catalog/api';
import { useCatalogData } from '@/features/catalog/useCatalogData';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Students = () => {
  const { data, error, loading } = useCatalogData(fetchStudents);

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
      {loading || error ? (
        <CatalogState
          loading={loading}
          error={error}
          subject='degli studenti'
        />
      ) : data.length ? (
        <ul className='catalog-list'>
          {data.map((student) => (
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
      ) : (
        <p className='catalog-muted'>Nessuno studente nel catalogo.</p>
      )}
    </div>
  );
};
