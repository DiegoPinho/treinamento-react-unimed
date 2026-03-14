import { useState, useMemo, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { useDebounce } from '../../hooks/useDebounce'
import PageHeader from '../../components/PageHeader'
import DataCard from '../../components/DataCard'
import StatusBadge from '../../components/StatusBadge'
import LoadingSpinner from '../../components/LoadingSpinner'
import EmptyState from '../../components/EmptyState'
import InputField from '../../components/InputField'
import { formatDate } from '../../utils/formatters'

const ITEMS_PER_PAGE = 4

export default function ExamesPage() {
  const { paciente } = useAuth()

  const {
    data: exames,
    loading,
    error,
  } = useFetch(`/exames?pacienteId=${paciente.id}`)

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('desc')
  const [pagina, setPagina] = useState(1)

  const buscaDebounced = useDebounce(busca, 300)

  const examesFiltrados = useMemo(() => {
    if (!exames) return []

    let resultado = exames

    if (buscaDebounced) {
      const termo = buscaDebounced.toLowerCase()
      resultado = resultado.filter((e) => e.tipo.toLowerCase().includes(termo))
    }

    resultado = [...resultado].sort((a, b) => {
      const dateA = new Date(a.data)
      const dateB = new Date(b.data)
      return ordenacao === 'desc' ? dateB - dateA : dateA - dateB
    })

    return resultado
  }, [exames, buscaDebounced, ordenacao])

  const totalPaginas = Math.ceil(examesFiltrados.length / ITEMS_PER_PAGE)

  const examesPaginados = useMemo(() => {
    const inicio = (pagina - 1) * ITEMS_PER_PAGE
    return examesFiltrados.slice(inicio, inicio + ITEMS_PER_PAGE)
  }, [examesFiltrados, pagina])

  const handleBuscaChange = useCallback((e) => {
    setBusca(e.target.value)
    setPagina(1)
  }, [])

  const toggleOrdenacao = useCallback(() => {
    setOrdenacao((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    setPagina(1)
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="error-message">Erro ao carregar exames: {error}</p>

  return (
    <div className="exames-page">
      <PageHeader
        title="Meus Exames"
        subtitle={`${examesFiltrados.length} exame(s) encontrado(s)`}
      />

      <div className="exames-controls">
        <InputField
          placeholder="Buscar por tipo de exame..."
          value={busca}
          onChange={handleBuscaChange}
        />
        <button className="btn btn--secondary" onClick={toggleOrdenacao}>
          Ordenar por data {ordenacao === 'desc' ? '↓' : '↑'}
        </button>
      </div>

      {examesPaginados.length === 0 ? (
        <EmptyState message="Nenhum exame encontrado." />
      ) : (
        <div className="exames-list">
          {examesPaginados.map((exame) => (
            <DataCard key={exame.id}>
              <div className="exame-card">
                <div className="exame-card__header">
                  <h3>{exame.tipo}</h3>
                  <StatusBadge status={exame.status} />
                </div>
                <p className="exame-card__data">📅 {formatDate(exame.data)}</p>
                {exame.status === 'resultado_disponivel' && (
                  <button className="btn btn--link">📄 Ver resultado</button>
                )}
              </div>
            </DataCard>
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            className="btn btn--secondary"
            disabled={pagina === 1}
            onClick={() => setPagina((prev) => prev - 1)}
          >
            Anterior
          </button>
          <span className="pagination__info">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="btn btn--secondary"
            disabled={pagina === totalPaginas}
            onClick={() => setPagina((prev) => prev + 1)}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
