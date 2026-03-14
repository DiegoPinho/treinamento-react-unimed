import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificacoesProvider } from './contexts/NotificacoesContext'
import LoginPage from './modules/auth/LoginPage'
import Layout from './components/Layout'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <NotificacoesProvider>
      <Layout />
    </NotificacoesProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
