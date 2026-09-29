import { Link } from 'react-router';
import { useStats } from '@/features/stats/useStats';
import { paths } from '@/router/paths';
import './Home.css';

const entryPoints = [
  {
    number: '01',
    title: 'Argomenti',
    description:
      'Parti da ciò che vuoi ripassare e scopri i progetti collegati.',
    path: paths.topics,
  },
  {
    number: '02',
    title: 'Progetti',
    description: 'Esplora il lavoro della classe, le repository e i materiali.',
    path: paths.projects,
  },
  {
    number: '03',
    title: 'Studenti',
    description: 'Conosci le persone della WDPT14 e i loro progetti pubblici.',
    path: paths.students,
  },
];

const counters = [
  { key: 'students_count', label: 'Studenti' },
  { key: 'projects_count', label: 'Progetti' },
  { key: 'repositories_count', label: 'Repository disponibili' },
  { key: 'cheatsheets_count', label: 'Cheat sheet' },
  { key: 'resources_count', label: 'Risorse' },
];

export const Home = () => {
  const stats = useStats();

  return (
    <div className='home'>
      <section className='home-hero' aria-labelledby='home-title'>
        <div className='home-intro'>
          <p className='home-eyebrow'>Boolean · Web Development Part Time</p>
          <h1 id='home-title'>Class14</h1>
          <p className='home-description'>
            Il percorso della WDPT14, in un unico posto. Esplora argomenti,
            progetti, persone e materiali da ritrovare quando servono.
          </p>
          <div className='home-actions'>
            <Link to={paths.topics} className='home-primary-link'>
              Esplora gli argomenti <span aria-hidden='true'>↗</span>
            </Link>
            <Link to={paths.projects} className='home-secondary-link'>
              Vedi i progetti
            </Link>
          </div>
        </div>
        <div className='home-visual' aria-hidden='true'>
          <span>14</span>
          <small>WDPT / BOOLEAN</small>
        </div>
      </section>

      <section className='home-explore' aria-labelledby='explore-title'>
        <div className='home-section-heading'>
          <p className='home-eyebrow'>L'archivio della classe</p>
          <h2 id='explore-title'>Trova il tuo punto di partenza</h2>
        </div>
        <div className='home-entry-list'>
          {entryPoints.map(({ number, title, description, path }) => (
            <Link to={path} className='home-entry' key={path}>
              <span className='home-entry-number'>{number}</span>
              <span className='home-entry-content'>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
              <span className='home-entry-arrow' aria-hidden='true'>
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className='home-materials' aria-labelledby='materials-title'>
        <div>
          <p className='home-eyebrow'>Per ripassare</p>
          <h2 id='materials-title'>Materiali a portata di mano</h2>
          <p>
            Cheat sheet e risorse utili, collegati ai progetti del percorso.
          </p>
        </div>
        <div className='home-material-links'>
          <Link to={paths.cheatsheets}>
            Cheat sheet <span aria-hidden='true'>↗</span>
          </Link>
          <Link to={paths.resources}>
            Risorse <span aria-hidden='true'>↗</span>
          </Link>
        </div>
      </section>

      <section className='home-stats' aria-labelledby='stats-title'>
        <div className='home-section-heading'>
          <p className='home-eyebrow'>Il catalogo Class14</p>
          <h2 id='stats-title'>Il percorso in numeri</h2>
        </div>
        {stats.step === 'success' && (
          <dl className='home-stat-list'>
            {counters.map(({ key, label }) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{stats.data[key]}</dd>
              </div>
            ))}
          </dl>
        )}
        {(stats.step === 'idle' || stats.step === 'loading') && (
          <p role='status'>Caricamento dei contatori…</p>
        )}
        {stats.step === 'error' && (
          <p role='status'>Contatori non disponibili al momento.</p>
        )}
      </section>
    </div>
  );
};
