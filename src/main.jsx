import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CostosAjustadosProvider } from './context/CostosAjustadosContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CostosAjustadosProvider>
      <App />
    </CostosAjustadosProvider>
  </StrictMode>
);
