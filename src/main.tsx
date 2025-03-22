import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="wbsports-ui-theme">
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
