import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}
createRoot(rootElement).render(<App />);
