import React from 'react'
import DataCard from '../../components/DataCard'
import StatusBadge from '../../components/StatusBadge'
import { formatDateTime } from '../../utils/formatters'

const ConsultaCard = React.memo(function ConsultaCard({ consulta }) {
  return (
    <DataCard>
      <div className="consulta-card">
        <div className="consulta-card__header">
          <h3 className="consulta-card__especialidade">{consulta.especialidade}</h3>
          <StatusBadge status={consulta.status} />
        </div>
        <p className="consulta-card__medico">{consulta.medico}</p>
        <div className="consulta-card__details">
          <span>📅 {formatDateTime(consulta.data)}</span>
          <span>📍 {consulta.local}</span>
        </div>
      </div>
    </DataCard>
  )
})

export default ConsultaCard
