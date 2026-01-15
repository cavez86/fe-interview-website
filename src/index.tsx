import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { FiltersProvider } from './providers/FiltersProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </StrictMode>,
);
