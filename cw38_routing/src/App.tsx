import { useState } from 'react';
import AppLayout from './components/AppLayout';
import ClassLifecyclePage from './pages/ClassLifecyclePage';
import FunctionLifecyclePage from './pages/FunctionLifecyclePage';
import HomePage from './pages/HomePage';
import RoutePresentPage from './pages/RoutePresentPage';
import type { AppPage } from './types';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="class" element={<ClassLifecyclePage />} />
        <Route path="function" element={<FunctionLifecyclePage />} />
        <Route path="convert/:from/:to" element={<RoutePresentPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
