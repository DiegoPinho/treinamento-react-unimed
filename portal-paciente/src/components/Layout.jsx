import { useState, useCallback } from 'react'
import Header from './Header'
import DashboardPage from '../modules/dashboard/DashboardPage'
import ConsultasPage from '../modules/consultas/ConsultasPage'
import ExamesPage from '../modules/exames/ExamesPage'
import AgendamentoPage from '../modules/agendamento/AgendamentoPage'

export default function Layout() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navigate = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  function renderPage() {
    switch (currentPage) {
      case 'consultas':
        return <ConsultasPage />
      case 'exames':
        return <ExamesPage />
      case 'agendamento':
        return <AgendamentoPage />
      default:
        return <DashboardPage onNavigate={navigate} />
    }
  }

  return (
    <div className="layout">
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}
