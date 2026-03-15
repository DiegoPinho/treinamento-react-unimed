// =============================================
// CONFIGURAÇÃO DA API
// =============================================

const API_URL = 'http://localhost:3001'

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
// SELEÇÃO DE ELEMENTOS
// =============================================

const loginPage = document.querySelector('#login-page')
const appContainer = document.querySelector('#app-container')
const loginForm = document.querySelector('#login-form')
const carteirinhaInput = document.querySelector('#carteirinha')
const senhaInput = document.querySelector('#senha')
const carteirinhaError = document.querySelector('#carteirinha-error')
const senhaError = document.querySelector('#senha-error')
const loginError = document.querySelector('#login-error')
const btnLogin = document.querySelector('#btn-login')
const userName = document.querySelector('#user-name')
const btnLogout = document.querySelector('#btn-logout')
const consultasList = document.querySelector('#consultas-list')
const consultasCount = document.querySelector('#consultas-count')
const loadingEl = document.querySelector('#loading')
const errorBanner = document.querySelector('#error-banner')
const errorBannerText = document.querySelector('#error-banner-text')
const btnRetry = document.querySelector('#btn-retry')
const emptyState = document.querySelector('#empty-state')
const filtroStatus = document.querySelector('#filtro-status')

// =============================================
// ESTADO DA APLICAÇÃO
// Perceba como precisamos gerenciar tudo "na mão"
// =============================================

let currentPaciente = null
let todasConsultas = []
let filtroAtual = 'todas'

// =============================================
// FUNÇÕES DE COMUNICAÇÃO COM A API (fetch)
// =============================================

async function loginViaAPI(carteirinha, senha) {
  // Buscar paciente pela carteirinha na API
  const response = await fetch(
    `${API_URL}/pacientes?carteirinha=${encodeURIComponent(carteirinha)}`
  )

  if (!response.ok) {
    throw new Error('Erro ao conectar com o servidor.')
  }

  const pacientes = await response.json()

  if (pacientes.length === 0) {
    throw new Error('Carteirinha não encontrada.')
  }

  const paciente = pacientes[0]

  if (paciente.senha !== senha) {
    throw new Error('Senha incorreta.')
  }

  return paciente
}

async function fetchConsultas(pacienteId) {
  const response = await fetch(
    `${API_URL}/consultas?pacienteId=${pacienteId}&_sort=data&_order=desc`
  )

  if (!response.ok) {
    throw new Error('Erro ao carregar consultas.')
  }

  return response.json()
}

// =============================================
// CONTROLE DE ESTADOS VISUAIS
// Perceba como temos que controlar manualmente
// o que aparece e o que some na tela
// =============================================

function showLoading() {
  loadingEl.style.display = 'flex'
  consultasList.style.display = 'none'
  errorBanner.style.display = 'none'
  emptyState.style.display = 'none'
}

function hideLoading() {
  loadingEl.style.display = 'none'
}

function showError(message) {
  hideLoading()
  errorBanner.style.display = 'block'
  errorBannerText.textContent = message
  consultasList.style.display = 'none'
  emptyState.style.display = 'none'
}

function showEmpty() {
  hideLoading()
  emptyState.style.display = 'block'
  consultasList.style.display = 'none'
  errorBanner.style.display = 'none'
}

function showConsultas() {
  hideLoading()
  consultasList.style.display = 'flex'
  errorBanner.style.display = 'none'
  emptyState.style.display = 'none'
}

// =============================================
// RENDERIZAÇÃO
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
  consultasList.innerHTML = ''
  consultasCount.textContent = `${consultas.length} consulta(s) encontrada(s)`

  if (consultas.length === 0) {
    showEmpty()
    return
  }

  consultas.forEach(function (consulta) {
    const card = createConsultaCard(consulta)
    consultasList.appendChild(card)
  })

  showConsultas()
}

function filterAndRender() {
  let consultasFiltradas = todasConsultas

  if (filtroAtual !== 'todas') {
    consultasFiltradas = todasConsultas.filter(function (c) {
      return c.status === filtroAtual
    })
  }

  renderConsultas(consultasFiltradas)
}

// =============================================
// CARREGAMENTO DE DADOS DA API
// =============================================

async function loadConsultas() {
  showLoading()

  try {
    todasConsultas = await fetchConsultas(currentPaciente.id)
    filterAndRender()
  } catch (error) {
    showError(error.message)
  }
}

// =============================================
// VALIDAÇÃO DO LOGIN
// =============================================

function validateLogin() {
  let isValid = true

  carteirinhaError.textContent = ''
  senhaError.textContent = ''
  loginError.textContent = ''
  carteirinhaInput.classList.remove('input-error')
  senhaInput.classList.remove('input-error')

  if (!carteirinhaInput.value.trim()) {
    carteirinhaError.textContent = 'A carteirinha é obrigatória.'
    carteirinhaInput.classList.add('input-error')
    isValid = false
  }

  if (!senhaInput.value.trim()) {
    senhaError.textContent = 'A senha é obrigatória.'
    senhaInput.classList.add('input-error')
    isValid = false
  }

  return isValid
}

// =============================================
// NAVEGAÇÃO
// =============================================

function showApp(paciente) {
  currentPaciente = paciente
  loginPage.style.display = 'none'
  appContainer.style.display = 'block'
  userName.textContent = paciente.nome.split(' ')[0]

  // Resetar filtro
  filtroAtual = 'todas'
  document.querySelectorAll('.filtro-btn').forEach(function (btn) {
    btn.classList.remove('filtro-btn--active')
    if (btn.dataset.status === 'todas') {
      btn.classList.add('filtro-btn--active')
    }
  })

  // Carregar consultas da API
  loadConsultas()
}

function showLogin() {
  currentPaciente = null
  todasConsultas = []
  appContainer.style.display = 'none'
  loginPage.style.display = 'flex'
  loginForm.reset()
  btnLogin.disabled = false
  btnLogin.textContent = 'Entrar'
}

// =============================================
// EVENT LISTENERS
// =============================================

// Login — agora assíncrono com fetch
loginForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  if (!validateLogin()) return

  // Feedback visual durante o login
  btnLogin.disabled = true
  btnLogin.textContent = 'Entrando...'
  loginError.textContent = ''

  try {
    const paciente = await loginViaAPI(
      carteirinhaInput.value.trim(),
      senhaInput.value
    )
    showApp(paciente)
  } catch (error) {
    loginError.textContent = error.message
    btnLogin.disabled = false
    btnLogin.textContent = 'Entrar'
  }
})

// Logout
btnLogout.addEventListener('click', showLogin)

// Filtro por status
filtroStatus.addEventListener('click', function (event) {
  const btn = event.target.closest('.filtro-btn')
  if (!btn) return

  // Atualizar botão ativo
  document.querySelectorAll('.filtro-btn').forEach(function (b) {
    b.classList.remove('filtro-btn--active')
  })
  btn.classList.add('filtro-btn--active')

  // Aplicar filtro
  filtroAtual = btn.dataset.status
  filterAndRender()
})

// Retry em caso de erro
btnRetry.addEventListener('click', loadConsultas)
