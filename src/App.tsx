import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar.tsx'
import styles from './styles/App.module.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className={styles.appShell}>
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}


