import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import WeatherPage from './pages/WeatherPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotFound from './pages/NotFound.tsx';
import AppLayout from './components/AppLayout.tsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
