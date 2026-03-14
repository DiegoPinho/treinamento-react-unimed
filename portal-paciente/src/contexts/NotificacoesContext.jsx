import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { get, patch } from '../services/api'

const NotificacoesContext = createContext(null)

const initialState = {
  notificacoes: [],
  naoLidas: 0,
  loading: false,
}

function notificacoesReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true }

    case 'LOAD_NOTIFICATIONS':
      return {
        ...state,
        notificacoes: action.payload,
        naoLidas: action.payload.filter((n) => !n.lida).length,
        loading: false,
      }

    case 'MARK_AS_READ': {
      const updated = state.notificacoes.map((n) =>
        n.id === action.payload ? { ...n, lida: true } : n,
      )
      return {
        ...state,
        notificacoes: updated,
        naoLidas: updated.filter((n) => !n.lida).length,
      }
    }

    case 'MARK_ALL_READ': {
      const allRead = state.notificacoes.map((n) => ({ ...n, lida: true }))
      return {
        ...state,
        notificacoes: allRead,
        naoLidas: 0,
      }
    }

    default:
      return state
  }
}

export function NotificacoesProvider({ children }) {
  const [state, dispatch] = useReducer(notificacoesReducer, initialState)
  const { paciente } = useAuth()

  useEffect(() => {
    if (!paciente) return

    dispatch({ type: 'LOAD_START' })
    get(`/notificacoes?pacienteId=${paciente.id}&_sort=data&_order=desc`)
      .then((data) => dispatch({ type: 'LOAD_NOTIFICATIONS', payload: data }))
      .catch(console.error)
  }, [paciente])

  const marcarComoLida = useCallback(async (id) => {
    await patch(`/notificacoes/${id}`, { lida: true })
    dispatch({ type: 'MARK_AS_READ', payload: id })
  }, [])

  const marcarTodasComoLidas = useCallback(async () => {
    const promises = state.notificacoes
      .filter((n) => !n.lida)
      .map((n) => patch(`/notificacoes/${n.id}`, { lida: true }))
    await Promise.all(promises)
    dispatch({ type: 'MARK_ALL_READ' })
  }, [state.notificacoes])

  return (
    <NotificacoesContext.Provider
      value={{
        ...state,
        marcarComoLida,
        marcarTodasComoLidas,
      }}
    >
      {children}
    </NotificacoesContext.Provider>
  )
}

export function useNotificacoes() {
  const context = useContext(NotificacoesContext)
  if (!context) {
    throw new Error('useNotificacoes deve ser usado dentro de um NotificacoesProvider')
  }
  return context
}
