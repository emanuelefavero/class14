import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { RootLayout } from './RootLayout';
import { paths } from './router/paths';

const Cheatsheets = lazy(() =>
  import('./pages/materials/Cheatsheets').then(({ Cheatsheets }) => ({
    default: Cheatsheets,
  })),
);
const NewResource = lazy(() =>
  import('./pages/materials/NewResource').then(({ NewResource }) => ({
    default: NewResource,
  })),
);
const Resources = lazy(() =>
  import('./pages/materials/Resources').then(({ Resources }) => ({
    default: Resources,
  })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then(({ NotFound }) => ({ default: NotFound })),
);
const Project = lazy(() =>
  import('./pages/projects/Project').then(({ Project }) => ({
    default: Project,
  })),
);
const Projects = lazy(() =>
  import('./pages/projects/Projects').then(({ Projects }) => ({
    default: Projects,
  })),
);
const Student = lazy(() =>
  import('./pages/students/Student').then(({ Student }) => ({
    default: Student,
  })),
);
const Students = lazy(() =>
  import('./pages/students/Students').then(({ Students }) => ({
    default: Students,
  })),
);
const Topic = lazy(() =>
  import('./pages/topics/Topic').then(({ Topic }) => ({ default: Topic })),
);
const Topics = lazy(() =>
  import('./pages/topics/Topics').then(({ Topics }) => ({ default: Topics })),
);

const providers = [BrowserRouter, Routes];

const Nest = ({ providers, children }) =>
  providers.reduceRight(
    (nested, Provider) => <Provider>{nested}</Provider>,
    children,
  );

export const App = () => (
  <Nest providers={providers}>
    <Route path={paths.home} element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path={paths.topics} element={<Topics />} />
      <Route path={paths.topic} element={<Topic />} />
      <Route path={paths.projects} element={<Projects />} />
      <Route path={paths.project} element={<Project />} />
      <Route path={paths.students} element={<Students />} />
      <Route path={paths.student} element={<Student />} />
      <Route path={paths.cheatsheets} element={<Cheatsheets />} />
      <Route path={paths.resources} element={<Resources />} />
      <Route path={paths.resourcesNew} element={<NewResource />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  </Nest>
);
