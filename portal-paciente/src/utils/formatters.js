export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getStatusLabel(status) {
  const labels = {
    agendada: 'Agendada',
    realizada: 'Realizada',
    cancelada: 'Cancelada',
    agendado: 'Agendado',
    aguardando_resultado: 'Aguardando Resultado',
    resultado_disponivel: 'Resultado Disponível',
  }
  return labels[status] || status
}

export function getStatusColor(status) {
  const colors = {
    agendada: 'blue',
    realizada: 'green',
    cancelada: 'red',
    agendado: 'blue',
    aguardando_resultado: 'orange',
    resultado_disponivel: 'green',
  }
  return colors[status] || 'gray'
}
