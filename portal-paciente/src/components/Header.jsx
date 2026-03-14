import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotificacoes } from '../contexts/NotificacoesContext'
import { formatDateTime } from '../utils/formatters'

export default function Header({ currentPage, onNavigate }) {
  const { paciente, logout } = useAuth()
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } = useNotificacoes()
  const [showNotificacoes, setShowNotificacoes] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotificacoes(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { key: 'dashboard', label: 'Início' },
    { key: 'consultas', label: 'Consultas' },
    { key: 'exames', label: 'Exames' },
    { key: 'agendamento', label: 'Agendamento' },
  ]

  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__logo-icon">🏥</span>
        <h1>Portal do Paciente</h1>
      </div>

      <nav className="header__nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`header__nav-item ${currentPage === item.key ? 'header__nav-item--active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header__actions">
        <div className="header__notifications" ref={notifRef}>
          <button
            className="header__notification-btn"
            onClick={() => setShowNotificacoes(!showNotificacoes)}
          >
            🔔
            {naoLidas > 0 && <span className="header__notification-badge">{naoLidas}</span>}
          </button>

          {showNotificacoes && (
            <div className="notification-dropdown">
              <div className="notification-dropdown__header">
                <h3>Notificações</h3>
                {naoLidas > 0 && (
                  <button
                    className="notification-dropdown__mark-all"
                    onClick={marcarTodasComoLidas}
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              <div className="notification-dropdown__list">
                {notificacoes.length === 0 ? (
                  <p className="notification-dropdown__empty">Nenhuma notificação</p>
                ) : (
                  notificacoes.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notification-item ${!notif.lida ? 'notification-item--unread' : ''}`}
                      onClick={() => !notif.lida && marcarComoLida(notif.id)}
                    >
                      <strong>{notif.titulo}</strong>
                      <p>{notif.mensagem}</p>
                      <span className="notification-item__date">{formatDateTime(notif.data)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <span className="header__user-name">{paciente?.nome?.split(' ')[0]}</span>
        <button className="header__logout-btn" onClick={logout}>
          Sair
        </button>
      </div>
    </header>
  )
}
