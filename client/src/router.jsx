// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ApplicationsPage from './pages/ApplicationsPage.jsx'
import KanbanPage from './pages/KanbanPage.jsx'
import CoverLetterPage from './pages/CoverLetterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'applications', element: <ApplicationsPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'cover-letter', element: <CoverLetterPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default router
