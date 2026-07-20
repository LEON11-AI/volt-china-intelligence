import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeAnalytics } from './src/lib/analytics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
initializeAnalytics();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
