import {
  ArrowUpRight,
  BookOpenText,
  FileText,
  FolderKanban,
  Library,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { useStats } from '@/features/stats/hooks/useStats';
import { paths } from '@/router/paths';
import './Home.css';

const entryPoints = [
  {
    number: '01',
    title: 'Argomenti',
    description:
      'Parti da ciò che vuoi ripassare e scopri i progetti collegati.',
    path: paths.topics,
    icon: BookOpenText,
  },
  {
    number: '02',
    title: 'Progetti',
    description: 'Esplora il lavoro della classe, le repository e i materiali.',
    path: paths.projects,
    icon: FolderKanban,
  },
  {
    number: '03',
    title: 'Studenti',
    description: 'Conosci le persone della WDPT14 e i loro progetti pubblici.',
    path: paths.students,
    icon: Users,
  },
];

const counters = [
  { key: 'students_count', label: 'Studenti', code: 'STU' },
  { key: 'projects_count', label: 'Progetti', code: 'PRJ' },
  {
    key: 'repositories_count',
    label: 'Repository disponibili',
    code: 'REP',
  },
  { key: 'cheatsheets_count', label: 'Cheat sheet', code: 'PDF' },
  { key: 'resources_count', label: 'Risorse', code: 'URL' },
];

export const Home = () => {
  const stats = useStats();

  return (
    <div className='home'>
      <section className='home-overview' aria-labelledby='home-title'>
        <div className='home-intro'>
          <p className='home-eyebrow'>
            <span aria-hidden='true' /> Boolean · Web Development Part Time
          </p>
          <h1 id='home-title'>Class14</h1>
          <p className='home-description'>
            Il workspace della WDPT14. Argomenti, progetti, persone e materiali
            del percorso, organizzati per essere ritrovati quando servono.
          </p>
          <div className='home-actions'>
            <Link to={paths.topics} className='home-primary-link'>
              Esplora gli argomenti <ArrowUpRight aria-hidden='true' />
            </Link>
            <Link to={paths.projects} className='home-secondary-link'>
              Vedi i progetti <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>

        <div className='home-visual' aria-hidden='true'>
          <div className='home-visual-header'>
            <span>CLASS INDEX</span>
            <span>ONLINE</span>
          </div>
          <strong>14</strong>
          <div className='home-visual-footer'>
            <span>REACT</span>
            <span>NODE</span>
            <span>EXPRESS</span>
            <span>MYSQL</span>
          </div>
        </div>

        <div className='home-stats-panel' aria-labelledby='stats-title'>
          <div className='home-stats-heading'>
            <div>
              <p className='home-eyebrow'>Catalogo live</p>
              <h2 id='stats-title'>Il percorso in numeri</h2>
            </div>
            <span className='home-stats-status'>Dati dal catalogo</span>
          </div>

          {stats.step === 'success' && (
            <dl className='home-stat-list'>
              {counters.map(({ key, label, code }) => (
                <div key={key}>
                  <dt>
                    <span>{code}</span>
                    {label}
                  </dt>
                  <dd>{stats.data[key]}</dd>
                </div>
              ))}
            </dl>
          )}
          {(stats.step === 'idle' || stats.step === 'loading') && (
            <p className='home-stats-message' role='status'>
              Caricamento dei contatori…
            </p>
          )}
          {stats.step === 'error' && (
            <p className='home-stats-message' role='status'>
              Contatori non disponibili al momento.
            </p>
          )}
        </div>
      </section>

      <section className='home-explore' aria-labelledby='explore-title'>
        <div className='home-section-heading'>
          <div>
            <p className='home-eyebrow'>Navigazione principale</p>
            <h2 id='explore-title'>Esplora il workspace</h2>
          </div>
          <p>
            Scegli il punto di ingresso più utile e segui i collegamenti tra
            tecnologie, lavoro della classe e persone.
          </p>
        </div>

        <div className='home-entry-grid'>
          {entryPoints.map(
            ({ number, title, description, path, icon: Icon }) => (
              <Link to={path} className='home-entry' key={path}>
                <span className='home-entry-topline'>
                  <span className='home-entry-icon'>
                    <Icon aria-hidden='true' />
                  </span>
                  <span className='home-entry-number'>{number}</span>
                </span>
                <span className='home-entry-content'>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
                <ArrowUpRight className='home-entry-arrow' aria-hidden='true' />
              </Link>
            ),
          )}
        </div>
      </section>

      <section className='home-materials' aria-labelledby='materials-title'>
        <div className='home-materials-copy'>
          <p className='home-eyebrow'>Libreria tecnica</p>
          <h2 id='materials-title'>Materiali a portata di mano</h2>
          <p>PDF e riferimenti esterni collegati ai progetti del percorso.</p>
        </div>
        <div className='home-material-links'>
          <Link to={paths.cheatsheets}>
            <FileText aria-hidden='true' />
            <span>
              <small>Documenti</small>
              Cheat sheet
            </span>
            <ArrowUpRight aria-hidden='true' />
          </Link>
          <Link to={paths.resources}>
            <Library aria-hidden='true' />
            <span>
              <small>Riferimenti</small>
              Risorse
            </span>
            <ArrowUpRight aria-hidden='true' />
          </Link>
        </div>
      </section>
    </div>
  );
};
