# Plano de Aulas – Treinamento React (Unimed)

## Projeto Condutor: Portal do Paciente

Aplicação web onde o paciente pode visualizar informações sobre seus atendimentos, consultas, exames e dados pessoais. O projeto é construído incrementalmente ao longo das 12 aulas, começando com HTML/CSS/JS puro e evoluindo até uma aplicação React bem estruturada.

### Dados mockados disponíveis no projeto

| Entidade | Campos principais |
|---|---|
| Paciente | nome, cpf, email, telefone, plano, carteirinha |
| Consulta | data, especialidade, médico, status (agendada/realizada/cancelada), local |
| Exame | tipo, data, status, resultado (link PDF) |
| Notificação | título, mensagem, lida (boolean), data |

> **Observação:** Todas as APIs serão simuladas com [json-server](https://github.com/typicode/json-server) ou dados estáticos locais. O foco é no front-end.

---

## Módulo 1: Fundamentos do Front-end Moderno (Aulas 1–3)

### Aula 1 – Estrutura, estilo e responsividade
**Objetivo:** Revisar HTML e CSS construindo a primeira tela do portal.

| Item | Detalhe |
|---|---|
| **Prática** | Construir a tela de **login do Portal do Paciente** com HTML e CSS puros |
| **Conteúdos** | Semântica HTML5, box model, Flexbox/Grid, media queries, mobile-first |
| **Entregável** | Página de login responsiva (desktop e mobile) com campos de carteirinha e senha |

**Conceitos-chave:**
- Estrutura semântica (`header`, `main`, `form`, `label`, `input`)
- Estilização com Flexbox para centralizar o formulário
- Media queries para adaptar a dois breakpoints

---

### Aula 2 – JavaScript no front-end: DOM e eventos
**Objetivo:** Mostrar como manipular a interface com JS puro e sentir as limitações.

| Item | Detalhe |
|---|---|
| **Prática** | Adicionar comportamento à tela de login (validação) e construir uma **lista de consultas** com dados estáticos em JS |
| **Conteúdos** | `querySelector`, `createElement`, `addEventListener`, template literals, manipulação de classes CSS |
| **Entregável** | Validação do login e página que renderiza cards de consultas a partir de um array JS |

**Conceitos-chave:**
- Seleção e criação dinâmica de elementos no DOM
- Event listeners para submit do formulário e cliques
- Renderização de listas via `innerHTML` ou `createElement`
- **Discussão:** por que este código fica difícil de manter à medida que cresce?

---

### Aula 3 – Requisições assíncronas e limitações do front-end tradicional
**Objetivo:** Consumir dados externos com `fetch` e entender por que bibliotecas como React surgiram.

| Item | Detalhe |
|---|---|
| **Prática** | Buscar consultas de uma API simulada (`json-server`) e exibir na tela; implementar um filtro por status |
| **Conteúdos** | `fetch`, Promises, `async/await`, tratamento de erros, loading states manuais |
| **Entregável** | Lista de consultas carregada via API com filtro funcional e indicador de carregamento |

**Conceitos-chave:**
- Ciclo request → response → atualização do DOM
- Manipulação manual do estado (loading, error, data)
- **Reflexão final:** listar as dores sentidas (estado espalhado, DOM imperativo, reaproveitamento difícil) → motivação para o React

---

## Módulo 2: Setup e Fundamentos do React (Aulas 4–6)

### Aula 4 – Ambiente de desenvolvimento e primeiros componentes
**Objetivo:** Criar o projeto React e entender JSX, componentes e props.

| Item | Detalhe |
|---|---|
| **Prática** | Criar o projeto com **Vite**, configurar ESLint/Prettier e construir os componentes `LoginPage`, `InputField` e `Button` |
| **Conteúdos** | Node.js, Vite, estrutura de pastas, JSX, componentes funcionais, props, composição |
| **Entregável** | Projeto React rodando com tela de login componentizada |

**Conceitos-chave:**
- `npm create vite@latest` → estrutura do projeto
- JSX como extensão do JavaScript
- Componentes como funções que retornam UI
- Props: passagem de dados de pai para filho
- Composição: `LoginPage` compõe `InputField` e `Button`

---

### Aula 5 – Estado, eventos e renderização condicional
**Objetivo:** Tornar a interface interativa com estado local.

| Item | Detalhe |
|---|---|
| **Prática** | Implementar o fluxo de login com `useState` (controlar inputs e simular autenticação) e criar um **Dashboard** com dados do paciente exibidos condicionalmente |
| **Conteúdos** | `useState`, manipulação de eventos (`onChange`, `onSubmit`), renderização condicional (`&&`, ternário), short-circuit |
| **Entregável** | Login funcional que redireciona para um Dashboard com nome e plano do paciente |

**Conceitos-chave:**
- Estado como variável reativa: `const [email, setEmail] = useState('')`
- Eventos sintéticos do React
- Renderização condicional para exibir mensagens de erro ou conteúdo autenticado
- Introdução ao conceito de "levantar estado" (lifting state up)

---

### Aula 6 – Listas, keys e estruturação inicial
**Objetivo:** Renderizar coleções de dados e entender a importância das keys.

| Item | Detalhe |
|---|---|
| **Prática** | Construir a página **Minhas Consultas** com cards renderizados via `.map()`, com badge de status colorido e filtro por status usando botões |
| **Conteúdos** | `.map()` com JSX, keys, desestruturação de props, componentização de cards, filtragem de arrays |
| **Entregável** | Tela de consultas com lista filtrada, componentes `ConsultaCard` e `FiltroStatus` |

**Conceitos-chave:**
- `array.map(item => <Component key={item.id} {...item} />)`
- Por que `key` é importante (reconciliation do React)
- Componente `ConsultaCard` recebendo dados via props
- Filtro controlado por estado que determina o que é renderizado

---

## Módulo 3: Hooks Essenciais e Formulários (Aulas 7–9)

### Aula 7 – useState na prática e padrões de atualização
**Objetivo:** Aprofundar o uso de `useState` com padrões mais avançados.

| Item | Detalhe |
|---|---|
| **Prática** | Criar a página **Meus Exames** com busca por texto, ordenação e paginação simples — tudo controlado por estados |
| **Conteúdos** | Estado com objetos e arrays, updater function `setState(prev => ...)`, múltiplos estados vs objeto de estado, estado derivado |
| **Entregável** | Listagem de exames com busca, ordenação por data e paginação client-side |

**Conceitos-chave:**
- Atualização baseada no estado anterior: `setPage(prev => prev + 1)`
- Estado derivado (lista filtrada computada a partir do estado original)
- Quando usar um estado vs computar um valor
- Imutabilidade: nunca mutar arrays/objetos diretamente

---

### Aula 8 – useEffect: efeitos colaterais e integração com API
**Objetivo:** Integrar a aplicação com APIs usando `useEffect`.

| Item | Detalhe |
|---|---|
| **Prática** | Migrar as consultas e exames para carregar dados do `json-server` via `fetch` dentro de `useEffect`; implementar loading e tratamento de erros |
| **Conteúdos** | `useEffect` (montagem, dependências, cleanup), integração com APIs, estados de loading/error/data |
| **Entregável** | Dashboard, consultas e exames carregando dados de API com feedback visual de carregamento e erro |

**Conceitos-chave:**
- `useEffect(() => { fetchData() }, [])` — executa na montagem
- Array de dependências: quando o efeito re-executa
- Cleanup function: cancelar requisições ou limpar timers
- Padrão try/catch/finally para loading states
- **Comparação:** como isso era feito na Aula 3 com JS puro

---

### Aula 9 – Formulários controlados e validação
**Objetivo:** Construir formulários reativos com boa experiência de usuário.

| Item | Detalhe |
|---|---|
| **Prática** | Criar o formulário de **Agendamento de Consulta** com campos de especialidade (select), data, observações e validação em tempo real |
| **Conteúdos** | Formulários controlados, `onChange` para cada campo, validação simples (required, formato), feedback inline, submit com API |
| **Entregável** | Tela de agendamento com validação visual, mensagens de erro por campo e envio simulado para API |

**Conceitos-chave:**
- Inputs controlados: `value={state}` + `onChange`
- Validação simples (campos obrigatórios, datas futuras)
- Feedback visual: bordas vermelhas, mensagens de ajuda
- `onSubmit` com `preventDefault` e envio via `fetch` POST
- Desabilitar botão durante envio

---

## Módulo 4: Arquitetura, Reaproveitamento e Qualidade (Aulas 10–12)

### Aula 10 – Componentização, organização e reutilização
**Objetivo:** Refatorar o projeto para uma arquitetura limpa e escalável.

| Item | Detalhe |
|---|---|
| **Prática** | Refatorar o portal adotando organização modular; extrair componentes reutilizáveis (`PageHeader`, `StatusBadge`, `DataCard`, `EmptyState`, `LoadingSpinner`) |
| **Conteúdos** | Organização de pastas por feature/módulo, composição avançada (children), componentes genéricos, barrel exports |
| **Entregável** | Projeto reorganizado com pasta `components/` (genéricos) e `modules/` (por domínio: consultas, exames, agendamento) |

**Estrutura alvo:**
```
src/
├── components/         # Componentes genéricos reutilizáveis
│   ├── PageHeader/
│   ├── StatusBadge/
│   ├── DataCard/
│   ├── EmptyState/
│   └── LoadingSpinner/
├── modules/
│   ├── auth/           # Login
│   ├── dashboard/      # Dashboard do paciente
│   ├── consultas/      # Minhas consultas
│   ├── exames/         # Meus exames
│   └── agendamento/    # Agendamento
├── services/           # Chamadas de API
└── utils/              # Helpers e formatadores
```

**Conceitos-chave:**
- Separação: componentes de UI vs componentes de negócio
- `children` prop para composição flexível
- Quando extrair um componente (regra dos 3 usos ou complexidade)
- **Paralelo com a arquitetura real:** mostrar como o Portal do Cooperado organiza seus módulos

---

### Aula 11 – Context API, useReducer e estado global
**Objetivo:** Compartilhar estado entre componentes distantes sem prop drilling.

| Item | Detalhe |
|---|---|
| **Prática** | Criar `AuthContext` (dados do paciente logado disponíveis em toda a app) e `NotificacoesContext` (badge de notificações não lidas no header); implementar `useReducer` para gerenciar as notificações |
| **Conteúdos** | Context API (`createContext`, `Provider`, `useContext`), `useReducer` (actions, dispatch, reducer), estado local vs global |
| **Entregável** | Paciente logado acessível em qualquer tela; sistema de notificações com contador e marcação de lida |

**Conceitos-chave:**
- Problema: prop drilling — passar props por 3+ níveis
- `createContext` + `Provider` + `useContext`
- `useReducer` para lógica de estado complexa (MARK_AS_READ, MARK_ALL_READ, LOAD_NOTIFICATIONS)
- Quando usar Context vs props vs estado local
- **Discussão:** tradeoffs do Context (re-renders) e quando considerar libs externas

---

### Aula 12 – Custom hooks, performance e encerramento
**Objetivo:** Criar abstrações reutilizáveis e otimizar a performance da aplicação.

| Item | Detalhe |
|---|---|
| **Prática** | Extrair custom hooks (`useFetch`, `useDebounce`, `useLocalStorage`), otimizar componentes com `React.memo`, `useMemo` e `useCallback`; revisão geral do projeto |
| **Conteúdos** | Custom hooks (extração de lógica, convenção `use*`), `React.memo`, `useMemo`, `useCallback`, React DevTools Profiler |
| **Entregável** | Hooks reutilizáveis aplicados no projeto; componentes otimizados; projeto final do Portal do Paciente completo |

**Conceitos-chave:**
- Custom hooks: extrair lógica stateful em funções reutilizáveis
  - `useFetch(url)` → `{ data, loading, error }`
  - `useDebounce(value, delay)` → valor com debounce para buscas
  - `useLocalStorage(key, initialValue)` → estado persistido
- `React.memo`: evitar re-render de componentes que não mudaram
- `useMemo`: memorizar cálculos caros (ex: filtragem de lista grande)
- `useCallback`: estabilizar referência de callbacks passados como props
- **Quando otimizar:** medir antes com DevTools, não otimizar prematuramente
- **Encerramento:** revisão do projeto final, recapitulação dos 4 módulos, próximos passos (roteamento, testes, TypeScript, state management avançado)

---

## Resumo da Evolução do Projeto

| Aula | O que é construído | Tecnologia |
|------|-------------------|------------|
| 1 | Tela de login | HTML + CSS |
| 2 | Login com validação + lista de consultas | HTML + CSS + JS |
| 3 | Consultas via API + filtro | JS + fetch + json-server |
| 4 | Projeto React + Login componentizado | React + Vite |
| 5 | Login funcional + Dashboard | React (useState, eventos) |
| 6 | Página Minhas Consultas | React (listas, keys, filtros) |
| 7 | Página Meus Exames | React (useState avançado) |
| 8 | Integração com API em todas as telas | React (useEffect, fetch) |
| 9 | Formulário de Agendamento | React (formulários, validação) |
| 10 | Refatoração e organização modular | Arquitetura de projeto |
| 11 | AuthContext + Notificações | Context API + useReducer |
| 12 | Custom hooks + otimização + revisão final | Hooks + performance |

---

## Recursos Necessários

- **Node.js** (v18+)
- **VS Code** com extensões: ESLint, Prettier, ES7+ React snippets
- **json-server** para simular API REST
- **Navegador** com React DevTools instalado
- Repositório Git para versionamento incremental do projeto
