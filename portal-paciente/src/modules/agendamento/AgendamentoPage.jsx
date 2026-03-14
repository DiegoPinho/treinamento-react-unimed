import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { get, post } from '../../services/api'
import PageHeader from '../../components/PageHeader'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

const initialForm = {
  especialidade: '',
  data: '',
  observacoes: '',
}

const initialErrors = {
  especialidade: '',
  data: '',
}

export default function AgendamentoPage() {
  const { paciente } = useAuth()
  const [especialidades, setEspecialidades] = useState([])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    get('/especialidades').then(setEspecialidades).catch(console.error)
  }, [])

  const validate = useCallback(() => {
    const newErrors = { ...initialErrors }
    let valido = true

    if (!form.especialidade) {
      newErrors.especialidade = 'Selecione uma especialidade.'
      valido = false
    }

    if (!form.data) {
      newErrors.data = 'Selecione uma data.'
      valido = false
    } else {
      const dataSelecionada = new Date(form.data)
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      if (dataSelecionada <= hoje) {
        newErrors.data = 'A data deve ser futura.'
        valido = false
      }
    }

    setErrors(newErrors)
    return valido
  }, [form])

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: '' }))
      setSucesso(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)
      await post('/consultas', {
        pacienteId: paciente.id,
        data: new Date(form.data).toISOString(),
        especialidade: form.especialidade,
        medico: 'A definir',
        status: 'agendada',
        local: 'Unimed Centro Clínico',
        observacoes: form.observacoes,
      })
      setSucesso(true)
      setForm(initialForm)
    } catch {
      setErrors((prev) => ({
        ...prev,
        especialidade: 'Erro ao agendar. Tente novamente.',
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="agendamento-page">
      <PageHeader
        title="Agendar Consulta"
        subtitle="Preencha os dados para solicitar um agendamento"
      />

      {sucesso && (
        <div className="alert alert--success">
          ✅ Consulta agendada com sucesso! Você receberá uma confirmação em breve.
        </div>
      )}

      <form onSubmit={handleSubmit} className="agendamento-form">
        <div className="form-group">
          <label className="input-field__label">Especialidade</label>
          <select
            className={`input-field__input ${errors.especialidade ? 'input-field__input--error' : ''}`}
            value={form.especialidade}
            onChange={handleChange('especialidade')}
          >
            <option value="">Selecione uma especialidade</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.nome}>
                {esp.nome}
              </option>
            ))}
          </select>
          {errors.especialidade && (
            <span className="input-field__error">{errors.especialidade}</span>
          )}
        </div>

        <InputField
          label="Data e Horário"
          type="datetime-local"
          value={form.data}
          onChange={handleChange('data')}
          error={errors.data}
        />

        <div className="form-group">
          <label className="input-field__label">Observações</label>
          <textarea
            className="input-field__input input-field__textarea"
            value={form.observacoes}
            onChange={handleChange('observacoes')}
            placeholder="Informações adicionais (opcional)"
            rows={4}
          />
        </div>

        <Button type="submit" loading={loading} disabled={loading}>
          Agendar Consulta
        </Button>
      </form>
    </div>
  )
}
