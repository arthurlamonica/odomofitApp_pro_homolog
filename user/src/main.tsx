import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeNativeMobile } from './services/nativeMobile';

// Inicializa otimizações de StatusBar, Splash Screen e Back Button para Android e iOS
initializeNativeMobile();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
