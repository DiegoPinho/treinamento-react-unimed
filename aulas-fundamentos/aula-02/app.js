// =============================================
// DADOS ESTÁTICOS (simulando uma "base de dados")
// =============================================

const PACIENTE = {
  nome: 'Maria Silva Santos',
  carteirinha: '0089234000012',
  senha: '123456',
  plano: 'Unimed Flex 200',
}

const CONSULTAS = [
  {
    id: 1,
    data: '2026-03-20T10:00:00',
    especialidade: 'Cardiologia',
    medico: 'Dr. Ricardo Mendes',
    status: 'agendada',
    local: 'Unimed Centro Clínico - Sala 305',
  },
  {
    id: 2,
    data: '2026-03-10T14:30:00',
    especialidade: 'Dermatologia',
    medico: 'Dra. Fernanda Lima',
    status: 'realizada',
    local: 'Unimed Centro Clínico - Sala 201',
  },
  {
    id: 3,
    data: '2026-02-15T09:00:00',
    especialidade: 'Ortopedia',
    medico: 'Dr. Carlos Andrade',
    status: 'realizada',
    local: 'Hospital Unimed - Bloco B',
  },
  {
    id: 4,
    data: '2026-02-28T11:00:00',
    especialidade: 'Oftalmologia',
    medico: 'Dra. Ana Beatriz Costa',
    status: 'cancelada',
    local: 'Unimed Centro Clínico - Sala 102',
  },
  {
    id: 5,
    data: '2026-04-05T08:30:00',
    especialidade: 'Clínica Geral',
    medico: 'Dr. Paulo Henrique Souza',
    status: 'agendada',
    local: 'Unimed Centro Clínico - Sala 410',
  },
  {
    id: 6,
    data: '2026-01-20T16:00:00',
    especialidade: 'Neurologia',
    medico: 'Dra. Mariana Oliveira',
    status: 'realizada',
    local: 'Hospital Unimed - Bloco A',
  },
]

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

function authenticate(carteirinha, senha) {
  if (carteirinha === PACIENTE.carteirinha && senha === PACIENTE.senha) {
    return PACIENTE
  }
  return null
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

function showApp(paciente) {
  loginPage.style.display = 'none'
  appContainer.style.display = 'block'
  userName.textContent = paciente.nome.split(' ')[0]
  renderConsultas(CONSULTAS)
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
loginForm.addEventListener('submit', function (event) {
  event.preventDefault()

  if (!validateLogin()) return

  const paciente = authenticate(carteirinhaInput.value.trim(), senhaInput.value)

  if (paciente) {
    showApp(paciente)
  } else {
    loginError.textContent = 'Carteirinha ou senha incorretos.'
  }
})

// Botão de logout
btnLogout.addEventListener('click', showLogin)
