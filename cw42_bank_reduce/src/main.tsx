import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AccountPage from './pages/AccountPage.tsx';
import PetPage from './pages/PetPage.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/account" replace />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="pet" element={<PetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
