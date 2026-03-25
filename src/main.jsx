import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

// Hide the site pre-loader once React has mounted and painted
function hideSiteLoader() {
  const loader = document.getElementById('site-loader')
  if (loader) {
    loader.classList.add('hidden')
    // Remove from DOM after transition ends to free memory
    loader.addEventListener('transitionend', () => loader.remove(), { once: true })
  }
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: { background: '#fff', color: '#1f2937' },
            success: { iconTheme: { primary: '#2F6F5E', secondary: '#fff' } },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

// Hide loader after first paint
requestAnimationFrame(() => requestAnimationFrame(hideSiteLoader))
