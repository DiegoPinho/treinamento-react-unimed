import React from 'react'
import { getStatusLabel } from '../../utils/formatters'

const FiltroStatus = React.memo(function FiltroStatus({ opcoes, selecionado, onChange }) {
  return (
    <div className="filtro-status">
      {opcoes.map((opcao) => (
        <button
          key={opcao}
          className={`filtro-status__btn ${selecionado === opcao ? 'filtro-status__btn--active' : ''}`}
          onClick={() => onChange(opcao)}
        >
          {opcao === 'todas' ? 'Todas' : getStatusLabel(opcao)}
        </button>
      ))}
    </div>
  )
})

export default FiltroStatus
