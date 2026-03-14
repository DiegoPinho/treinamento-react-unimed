import React from 'react'
import { getStatusLabel, getStatusColor } from '../utils/formatters'

const StatusBadge = React.memo(function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  )
})

export default StatusBadge
