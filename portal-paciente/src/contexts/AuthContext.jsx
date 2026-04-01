import { createContext, useContext, useState, useCallback } from 'react'
import { post } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [paciente, setPaciente] = useState(null)

  const login = useCallback(async (carteirinha, senha) => {
    const paciente = await post(`/login`, { carteirinha, senha })

    if (!paciente) {
      throw new Error('Carteirinha não encontrada')
    }

    // const pacienteEncontrado = pacientes[0]

    // if (pacienteEncontrado.senha !== senha) {
    //   throw new Error('Senha incorreta')
    // }

    // // Remove senha antes de armazenar
    // const { senha: _, ...dadosPaciente } = pacienteEncontrado
    setPaciente(paciente)
  }, [])

  const logout = useCallback(() => {
    setPaciente(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        paciente,
        isAuthenticated: !!paciente,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
