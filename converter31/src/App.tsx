import './App.css';
import { useState } from 'react';
import type { AppPage } from './types.ts';
import AppLayout from './components/AppLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import ClassPage from './pages/ClassPage.tsx';

import FunctionalPage from './pages/FunctionalPage.tsx';

function App() {
  const [page, setPage] = useState<AppPage>('home');

  return (
    <AppLayout activePage={page} onPageChange={setPage}>
      {/* {page === 'home' && <HomePage onPageChange={setPage} />} */}
      {page === 'home' && <HomePage />}
      {page === 'class' && <ClassPage />}
      {page === 'function' && <FunctionalPage />}
    </AppLayout>
  );
}

export default App;
