// =============================================
// CONFIGURAÇÃO DA API
// =============================================

const API_URL = 'https://portal-unimed-fake-api.onrender.com'

// =============================================
// FUNÇÕES UTILITÁRIAS
// =============================================

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusLabel(status) {
  const labels = {
    agendada: 'Agendada',
    realizada: 'Realizada',
    cancelada: 'Cancelada',
  }
  return labels[status] || status
}

// =============================================
// SELEÇÃO DE ELEMENTOS DO DOM
// =============================================

const loginPage = document.querySelector('#login-page')
const appContainer = document.querySelector('#app-container')
const loginForm = document.querySelector('#login-form')
const carteirinhaInput = document.querySelector('#carteirinha')
const senhaInput = document.querySelector('#senha')
const carteirinhaError = document.querySelector('#carteirinha-error')
const senhaError = document.querySelector('#senha-error')
const loginError = document.querySelector('#login-error')
const userName = document.querySelector('#user-name')
const btnLogout = document.querySelector('#btn-logout')
const consultasList = document.querySelector('#consultas-list')
const consultasCount = document.querySelector('#consultas-count')

// =============================================
// VALIDAÇÃO DO FORMULÁRIO DE LOGIN
// =============================================

function validateLogin() {
  let isValid = true

  // Limpar erros anteriores
  carteirinhaError.textContent = ''
  senhaError.textContent = ''
  loginError.textContent = ''
  carteirinhaInput.classList.remove('input-error')
  senhaInput.classList.remove('input-error')

  // Validar carteirinha
  if (!carteirinhaInput.value.trim()) {
    carteirinhaError.textContent = 'A carteirinha é obrigatória.'
    carteirinhaInput.classList.add('input-error')
    isValid = false
  }

  // Validar senha
  if (!senhaInput.value.trim()) {
    senhaError.textContent = 'A senha é obrigatória.'
    senhaInput.classList.add('input-error')
    isValid = false
  }

  return isValid
}

async function authenticate(carteirinha, senha) {
  try {
    const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
    return response.data
  } catch (error) {
    return null
  }
}

async function fetchConsultas(pacienteId) {
  const response = await axios.get(`${API_URL}/consultas`, {
    params: { pacienteId },
  })
  return response.data
}

// =============================================
// RENDERIZAÇÃO DE CONSULTAS
// =============================================

function createConsultaCard(consulta) {
  const card = document.createElement('div')
  card.className = 'consulta-card'

  card.innerHTML = `
    <div class="consulta-card__header">
      <span class="consulta-card__especialidade">${consulta.especialidade}</span>
      <span class="status-badge status-badge--${consulta.status}">
        ${getStatusLabel(consulta.status)}
      </span>
    </div>
    <p class="consulta-card__medico">${consulta.medico}</p>
    <div class="consulta-card__details">
      <span>📅 ${formatDateTime(consulta.data)}</span>
      <span>📍 ${consulta.local}</span>
    </div>
  `

  return card
}

function renderConsultas(consultas) {
  // Limpar lista atual
  consultasList.innerHTML = ''

  // Atualizar contador
  consultasCount.textContent = `${consultas.length} consulta(s) encontrada(s)`

  // Criar e adicionar cada card
  consultas.forEach(function (consulta) {
    const card = createConsultaCard(consulta)
    consultasList.appendChild(card)
  })
}

// =============================================
// NAVEGAÇÃO ENTRE TELAS
// =============================================

async function showApp(paciente) {
  loginPage.style.display = 'none'
  appContainer.style.display = 'block'
  userName.textContent = paciente.nome.split(' ')[0]

  try {
    const consultas = await fetchConsultas(paciente.id)
    renderConsultas(consultas)
  } catch (error) {
    consultasList.innerHTML = '<p style="color: red;">Erro ao carregar consultas. Tente novamente.</p>'
  }
}

function showLogin() {
  appContainer.style.display = 'none'
  loginPage.style.display = 'flex'
  loginForm.reset()
}

// =============================================
// EVENT LISTENERS
// =============================================

// Submissão do formulário de login
loginForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  if (!validateLogin()) return

  const btnSubmit = loginForm.querySelector('[type="submit"]')
  btnSubmit.disabled = true
  btnSubmit.textContent = 'Entrando...'

  try {
    const paciente = await authenticate(carteirinhaInput.value.trim(), senhaInput.value)
    console.log('Paciente autenticado:', paciente)

    if (paciente) {
      showApp(paciente)
    } else {
      loginError.textContent = 'Carteirinha ou senha incorretos.'
    }
  } catch (error) {
    loginError.textContent = 'Erro ao conectar com o servidor. Tente novamente.'
  } finally {
    btnSubmit.disabled = false
    btnSubmit.textContent = 'Entrar'
  }
})

// Botão de logout
btnLogout.addEventListener('click', showLogin)
