import { useMemo, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import PageHeader from '../../components/PageHeader'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import FiltroStatus from './FiltroStatus'
import ConsultaCard from './ConsultaCard'

const STATUS_OPTIONS = ['todas', 'agendada', 'realizada', 'cancelada']

export default function ConsultasPage() {
  const { paciente } = useAuth()

  const {
    data: consultas,
    loading,
    error,
  } = useFetch(`/consultas?pacienteId=${paciente.id}&_sort=data&_order=desc`)

  const [filtroStatus, setFiltroStatus] = useState('todas')

  const consultasFiltradas = useMemo(() => {
    if (!consultas) return []
    if (filtroStatus === 'todas') return consultas
    return consultas.filter((c) => c.status === filtroStatus)
  }, [consultas, filtroStatus])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="error-message">Erro ao carregar consultas: {error}</p>

  return (
    <div className="consultas-page">
      <PageHeader
        title="Minhas Consultas"
        subtitle={`${consultas?.length || 0} consulta(s) encontrada(s)`}
      />

      <FiltroStatus opcoes={STATUS_OPTIONS} selecionado={filtroStatus} onChange={setFiltroStatus} />

      {consultasFiltradas.length === 0 ? (
        <EmptyState message="Nenhuma consulta encontrada para este filtro." />
      ) : (
        <div className="consultas-list">
          {consultasFiltradas.map((consulta) => (
            <ConsultaCard key={consulta.id} consulta={consulta} />
          ))}
        </div>
      )}
    </div>
  )
}
