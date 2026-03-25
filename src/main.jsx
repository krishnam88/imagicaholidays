import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function hideSiteLoader() {
  const loader = document.getElementById('site-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);

// Hide loader once React has rendered
requestAnimationFrame(() => {
  requestAnimationFrame(hideSiteLoader);
});
