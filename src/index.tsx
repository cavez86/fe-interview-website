import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { FiltersProvider } from './providers/FiltersProvider';
import { ModalProvider } from './providers/ModalProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <FiltersProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </FiltersProvider>
  </StrictMode>,
);
