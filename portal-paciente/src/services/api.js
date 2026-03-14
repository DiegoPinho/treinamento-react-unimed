const API_URL = 'http://localhost:3001'

export async function get(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`)
  if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.status}`)
  return response.json()
}

export async function post(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erro ao enviar dados: ${response.status}`)
  return response.json()
}

export async function patch(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erro ao atualizar dados: ${response.status}`)
  return response.json()
}
