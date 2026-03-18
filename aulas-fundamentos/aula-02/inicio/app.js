const API_URL = 'https://portal-unimed-fake-api.onrender.com'

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
// AULA 02 - AUTENTICAÇÃO E CONSUMO DE API
// =============================================

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
      // TODO: Implementar troca de tela e exibir nome do paciente
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

async function authenticate(carteirinha, senha) {
  // TODO: Implementar autenticação com a API usando axios
}
