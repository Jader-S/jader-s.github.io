// React import not required with jsx: react-jsx, remove to satisfy noUnusedLocals
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import Home from './pages/Home'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product', element: <Product /> },
    ],
  },
])

const rootEl = document.getElementById('root') as HTMLElement
createRoot(rootEl).render(<RouterProvider router={router} />)


