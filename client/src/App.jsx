import { BrowserRouter, Route, Routes } from 'react-router';
import {
  Cheatsheets,
  Home,
  NewResource,
  NotFound,
  Project,
  Projects,
  Resources,
  Student,
  Students,
  Topic,
  Topics,
} from './pages';
import { RootLayout } from './RootLayout';
import { paths } from './router/paths';

export const App = () => (
  <BrowserRouter>
    <Routes>
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
    </Routes>
  </BrowserRouter>
);
