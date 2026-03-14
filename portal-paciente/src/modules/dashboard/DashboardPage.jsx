import { useMemo } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import PageHeader from '../../components/PageHeader'
import DataCard from '../../components/DataCard'
import StatusBadge from '../../components/StatusBadge'
import LoadingSpinner from '../../components/LoadingSpinner'
import { formatDateTime } from '../../utils/formatters'

export default function DashboardPage({ onNavigate }) {
  const { paciente } = useAuth()

  const { data: consultas, loading: loadingConsultas } = useFetch(
    `/consultas?pacienteId=${paciente.id}&_sort=data&_order=asc`,
  )
  const { data: exames, loading: loadingExames } = useFetch(
    `/exames?pacienteId=${paciente.id}&_sort=data&_order=desc`,
  )

  const proximaConsulta = useMemo(() => {
    if (!consultas) return null
    return consultas.find((c) => c.status === 'agendada')
  }, [consultas])

  const examesPendentes = useMemo(() => {
    if (!exames) return 0
    return exames.filter((e) => e.status === 'aguardando_resultado').length
  }, [exames])

  const resultadosDisponiveis = useMemo(() => {
    if (!exames) return 0
    return exames.filter((e) => e.status === 'resultado_disponivel').length
  }, [exames])

  if (loadingConsultas || loadingExames) return <LoadingSpinner />

  return (
    <div className="dashboard-page">
      <PageHeader
        title={`Olá, ${paciente.nome.split(' ')[0]}!`}
        subtitle="Aqui está um resumo das suas informações"
      />

      <div className="dashboard-info">
        <DataCard>
          <h3>Dados do Plano</h3>
          <p>
            <strong>Plano:</strong> {paciente.plano}
          </p>
          <p>
            <strong>Carteirinha:</strong> {paciente.carteirinha}
          </p>
          <p>
            <strong>Email:</strong> {paciente.email}
          </p>
          <p>
            <strong>Telefone:</strong> {paciente.telefone}
          </p>
        </DataCard>
      </div>

      <div className="dashboard-grid">
        <DataCard
          className="dashboard-card dashboard-card--clickable"
          onClick={() => onNavigate('consultas')}
        >
          <h3>Próxima Consulta</h3>
          {proximaConsulta ? (
            <>
              <p className="dashboard-card__highlight">{proximaConsulta.especialidade}</p>
              <p>{proximaConsulta.medico}</p>
              <p>{formatDateTime(proximaConsulta.data)}</p>
              <p className="dashboard-card__detail">{proximaConsulta.local}</p>
            </>
          ) : (
            <p className="dashboard-card__empty">Nenhuma consulta agendada</p>
          )}
        </DataCard>

        <DataCard
          className="dashboard-card dashboard-card--clickable"
          onClick={() => onNavigate('exames')}
        >
          <h3>Exames</h3>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat__number">{resultadosDisponiveis}</span>
              <span className="dashboard-stat__label">Resultados disponíveis</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__number">{examesPendentes}</span>
              <span className="dashboard-stat__label">Aguardando resultado</span>
            </div>
          </div>
        </DataCard>

        <DataCard
          className="dashboard-card dashboard-card--clickable"
          onClick={() => onNavigate('agendamento')}
        >
          <h3>Agendar Consulta</h3>
          <p className="dashboard-card__cta">Clique para agendar uma nova consulta</p>
        </DataCard>
      </div>

      {consultas && consultas.length > 0 && (
        <div className="dashboard-recent">
          <h3>Consultas Recentes</h3>
          <div className="dashboard-recent__list">
            {consultas.slice(0, 3).map((consulta) => (
              <div key={consulta.id} className="dashboard-recent__item">
                <div>
                  <strong>{consulta.especialidade}</strong>
                  <span> — {consulta.medico}</span>
                </div>
                <div className="dashboard-recent__meta">
                  <span>{formatDateTime(consulta.data)}</span>
                  <StatusBadge status={consulta.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
