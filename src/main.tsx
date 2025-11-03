// React import not required with jsx: react-jsx, remove to satisfy noUnusedLocals
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './styles/global.css'
import App from './App'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Product = lazy(() => import('./pages/Product'))
const Contact = lazy(() => import('./pages/Contact'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'product', element: <Product /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
  },
})

const rootEl = document.getElementById('root') as HTMLElement
createRoot(rootEl).render(
  <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
)


