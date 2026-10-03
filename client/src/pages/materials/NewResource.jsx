import { isAxiosError } from 'axios';
import {
  CircleAlert,
  CircleCheck,
  FolderKanban,
  Library,
  LoaderCircle,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createResource } from '@/features/catalog/createResource';
import { useProjects } from '@/features/catalog/hooks/useProjects';
import { paths } from '@/router/paths';
import '../Catalog.css';
import './ResourceForm.css';

const initialForm = {
  title: '',
  url: '',
  project_ids: [],
};

const getErrorMessage = (error) => {
  if (!isAxiosError(error)) {
    return 'Non è stato possibile aggiungere la risorsa.';
  }

  switch (error.response?.status) {
    case 400:
      return 'Controlla i dati inseriti e riprova.';
    case 404:
      return 'Uno dei progetti selezionati non è più disponibile.';
    case 409:
      return 'Questa risorsa è già presente nel catalogo.';
    default:
      return 'Non è stato possibile aggiungere la risorsa.';
  }
};

export const NewResource = () => {
  const projects = useProjects();
  const [form, setForm] = useState(initialForm);
  const [submission, setSubmission] = useState({ step: 'idle' });
  const isSubmitting = submission.step === 'submitting';

  const resetSubmission = () => {
    if (submission.step !== 'idle') setSubmission({ step: 'idle' });
  };

  const handleTextChange = (event) => {
    resetSubmission();
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProjectChange = (event) => {
    resetSubmission();
    const projectId = Number(event.target.value);

    setForm((current) => ({
      ...current,
      project_ids: event.target.checked
        ? [...current.project_ids, projectId]
        : current.project_ids.filter((id) => id !== projectId),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title: form.title.trim(),
      url: form.url.trim(),
      project_ids: form.project_ids,
    };

    if (!payload.title || !payload.url || payload.project_ids.length === 0) {
      setSubmission({
        step: 'error',
        message: 'Compila i campi e seleziona almeno un progetto.',
      });
      return;
    }

    setSubmission({ step: 'submitting' });

    try {
      const resource = await createResource(payload);
      setForm(initialForm);
      setSubmission({ step: 'success', resource });
    } catch (error) {
      setSubmission({ step: 'error', message: getErrorMessage(error) });
    }
  };

  const projectsReady = projects.step === 'success';

  return (
    <div className='catalog-page resource-create-page'>
      <header className='catalog-heading'>
        <Link className='catalog-back' to={paths.resources}>
          ← Tutte le risorse
        </Link>
        <p className='catalog-eyebrow'>Contribuisci · Learning Hub</p>
        <h1>Aggiungi una risorsa</h1>
        <p>
          Salva un riferimento utile e collegalo ai progetti in cui può essere
          ritrovato durante il ripasso.
        </p>
      </header>

      <div className='resource-form-layout'>
        <aside className='resource-form-guide' aria-labelledby='guide-title'>
          <span className='resource-form-guide-icon' aria-hidden='true'>
            <Library />
          </span>
          <p className='catalog-eyebrow'>Prima di inviare</p>
          <h2 id='guide-title'>Una risorsa, più contesti.</h2>
          <p>
            Il collegamento ai progetti rende il materiale raggiungibile anche
            dai rispettivi dettagli e argomenti.
          </p>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Usa un link diretto</strong>
                <p>Documentazione, tutorial o strumenti consultabili online.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Scegli il contesto</strong>
                <p>Associa almeno un progetto pertinente del catalogo.</p>
              </div>
            </li>
          </ol>
        </aside>

        <form className='resource-form' onSubmit={handleSubmit}>
          <section className='resource-form-section'>
            <div className='resource-form-section-heading'>
              <span>01</span>
              <div>
                <h2>Dettagli della risorsa</h2>
                <p>Inserisci un titolo riconoscibile e l’indirizzo completo.</p>
              </div>
            </div>

            <div className='resource-form-fields'>
              <label className='resource-field' htmlFor='resource-title'>
                <span>Titolo</span>
                <Input
                  id='resource-title'
                  name='title'
                  value={form.title}
                  onChange={handleTextChange}
                  maxLength={150}
                  placeholder='Es. React documentation'
                  autoComplete='off'
                  disabled={isSubmitting}
                  required
                />
              </label>

              <label className='resource-field' htmlFor='resource-url'>
                <span>URL</span>
                <Input
                  id='resource-url'
                  name='url'
                  type='url'
                  value={form.url}
                  onChange={handleTextChange}
                  maxLength={255}
                  placeholder='https://example.com/'
                  autoComplete='url'
                  disabled={isSubmitting}
                  required
                />
              </label>
            </div>
          </section>

          <section className='resource-form-section'>
            <div className='resource-form-section-heading'>
              <span>02</span>
              <div>
                <h2>Progetti collegati</h2>
                <p>Seleziona uno o più progetti in cui la risorsa è utile.</p>
              </div>
            </div>

            {(projects.step === 'idle' || projects.step === 'loading') && (
              <p className='resource-project-state' role='status'>
                <LoaderCircle aria-hidden='true' /> Caricamento dei progetti…
              </p>
            )}

            {projects.step === 'error' && (
              <p className='resource-project-state is-error' role='alert'>
                <CircleAlert aria-hidden='true' /> Progetti non disponibili al
                momento.
              </p>
            )}

            {projectsReady && (
              <fieldset
                className='resource-project-fieldset'
                disabled={isSubmitting}
              >
                <legend>Seleziona almeno un progetto</legend>
                <ul className='resource-project-grid'>
                  {projects.data.map((project) => (
                    <li key={project.id}>
                      <label className='resource-project-option'>
                        <input
                          type='checkbox'
                          name='project_ids'
                          value={project.id}
                          checked={form.project_ids.includes(project.id)}
                          onChange={handleProjectChange}
                        />
                        <span className='resource-project-copy'>
                          <strong>{project.title}</strong>
                          <small>
                            {project.topics.length
                              ? project.topics.join(' · ')
                              : 'Nessun argomento'}
                          </small>
                        </span>
                        <FolderKanban aria-hidden='true' />
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
          </section>

          <footer className='resource-form-footer'>
            <div className='resource-form-feedback' aria-live='polite'>
              {submission.step === 'error' && (
                <p className='is-error' role='alert'>
                  <CircleAlert aria-hidden='true' /> {submission.message}
                </p>
              )}
              {submission.step === 'success' && (
                <p className='is-success' role='status'>
                  <CircleCheck aria-hidden='true' /> “
                  {submission.resource.title}” è stata aggiunta.{' '}
                  <Link to={paths.resources}>Vai al catalogo</Link>
                </p>
              )}
            </div>

            <Button type='submit' disabled={!projectsReady || isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className='resource-submit-spinner'
                    aria-hidden='true'
                  />
                  Aggiunta in corso…
                </>
              ) : (
                <>
                  <Plus aria-hidden='true' /> Aggiungi risorsa
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};
