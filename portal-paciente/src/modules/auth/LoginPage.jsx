import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

export default function LoginPage() {
  const { login } = useAuth()
  const [carteirinha, setCarteirinha] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!carteirinha.trim() || !senha.trim()) {
      setError('Preencha todos os campos.')
      return
    }

    try {
      setLoading(true)
      await login(carteirinha, senha)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-header__icon">🏥</span>
          <h1>Portal do Paciente</h1>
          <p>Unimed</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <InputField
            label="Carteirinha"
            value={carteirinha}
            onChange={(e) => setCarteirinha(e.target.value)}
            placeholder="Digite sua carteirinha"
          />
          <InputField
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          {error && <p className="login-error">{error}</p>}

          <Button type="submit" loading={loading}>
            Entrar
          </Button>
        </form>

        <p className="login-hint">
          Carteirinha: <strong>0089234000012</strong> | Senha: <strong>123456</strong>
        </p>
      </div>
    </div>
  )
}
