# Arquitetura – Portal do Cooperado UNIMED

## Histórico de revisão
| Data       | Versão | Descrição                 | Autor                  |
|------------|--------|---------------------------|------------------------|
| 26/09/2025 | 1.0    | Versão inicial do documento | SQUADRA |

---

## 1. Visão Geral

O Portal do Cooperado UNIMED é uma aplicação web desenvolvida para médicos cooperados da UNIMED, oferecendo acesso a informações financeiras, extratos, demonstrativos, benefícios e outros serviços relacionados à cooperativa. O sistema centraliza diversos serviços que anteriormente estavam dispersos em sistemas legados, proporcionando uma experiência unificada e moderna para os cooperados.

Os principais usuários do sistema são:
- **Médicos Cooperados**: Acessam informações financeiras, demonstrativos, extratos e gerenciam benefícios como licenças remuneradas
- **Administradores**: Gerenciam acesso e podem simular o ambiente de um cooperado para suporte
- **Sistemas Integrados**: Consomem ou fornecem dados através de APIs para integração com outros sistemas da UNIMED

O portal atua como um hub central para todas as necessidades do cooperado, eliminando a necessidade de acessar múltiplos sistemas para diferentes funcionalidades.

---

## 2. Arquitetura Geral

### 2.1 Padrão Arquitetural

O Portal do Cooperado UNIMED segue uma **Arquitetura Modular em Camadas** baseada em React, com uma clara separação de responsabilidades. A arquitetura pode ser classificada como um **Single-Page Application (SPA)** que se comunica com uma API RESTful backend.

### 2.2 Camadas Funcionais

1. **Camada de Apresentação (UI)**
   - Implementada com React e Material UI (@mui/material)
   - Organizada em componentes reutilizáveis e módulos de negócio
   - Utiliza biblioteca de componentes própria (@unimedcampinas/componentes-react-ts)

2. **Camada de Gerenciamento de Estado**
   - Implementada com armazenamento local (sessionStorage)
   - Gerencia autenticação, dados do usuário e configurações da aplicação

3. **Camada de Serviços**
   - Encapsula a comunicação com APIs externas
   - Implementa lógica de negócios específica de cada módulo
   - Gerencia transformação de dados entre a UI e a API

4. **Camada de Comunicação**
   - Implementada com Axios para requisições HTTP
   - Gerencia interceptadores para autenticação e tratamento de erros
   - Abstrai detalhes de comunicação com o backend

5. **Camada de Modelos/Interfaces**
   - Define tipos TypeScript para garantir consistência de dados
   - Mapeia estruturas de dados da API para objetos de domínio da aplicação

### 2.3 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      Aplicação Frontend (SPA)                   │
├─────────────┬─────────────┬─────────────────┬─────────────────┐
│  Componentes│   Módulos   │    Serviços     │  Gerenciamento  │
│  Reutilizá- │  de Negócio │                 │   de Estado     │
│    veis     │             │                 │                 │
├─────────────┴─────────────┴─────────────────┴─────────────────┤
│                      Camada de Comunicação                     │
│                        (Axios/API.ts)                          │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API RESTful Backend                       │
├─────────────┬─────────────┬─────────────────┬─────────────────┐
│ Autenticação│  Cooperado  │    Financeiro   │  Outros Módulos │
│             │             │                 │                 │
└─────────────┴─────────────┴─────────────────┴─────────────────┘
```

---

## 3. Estrutura de Pastas (Project Layout)

```
/home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/
├── public/                  # Arquivos estáticos e HTML base
├── src/                     # Código-fonte da aplicação
│   ├── assets/              # Recursos estáticos (imagens, ícones, etc.)
│   ├── components/          # Componentes React reutilizáveis
│   ├── config/              # Configurações da aplicação
│   │   └── api.ts           # Configuração do cliente Axios
│   ├── interfaces/          # Interfaces TypeScript globais
│   ├── modules/             # Módulos de negócio
│   │   ├── autenticacao/    # Módulo de autenticação
│   │   │   ├── interfaces/  # Interfaces específicas do módulo
│   │   │   ├── pages/       # Componentes de página
│   │   │   └── services/    # Serviços de API
│   │   ├── cooperado/       # Módulo de cooperado
│   │   ├── dados-producao/  # Módulo de dados financeiros
│   │   │   ├── extratos-financeiros/
│   │   │   │   ├── interfaces/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── templates/ # Templates para geração de PDFs
│   │   │   └── ...
│   │   └── ...
│   ├── services/            # Serviços globais
│   ├── store/               # Gerenciamento de estado
│   │   └── storages/        # Armazenamento local
│   ├── styles/              # Estilos globais
│   └── utils/               # Funções utilitárias
├── package.json             # Dependências e scripts
└── README.md                # Documentação básica
```

### 3.1 Detalhamento dos Diretórios Principais

- **src/components/**: Componentes React reutilizáveis em toda a aplicação, independentes de domínio específico
- **src/config/**: Configurações globais da aplicação, incluindo setup de API e variáveis de ambiente
- **src/interfaces/**: Definições de tipos TypeScript compartilhados entre módulos
- **src/modules/**: Módulos de negócio organizados por domínio, cada um com sua própria estrutura interna
- **src/services/**: Serviços compartilhados entre módulos
- **src/store/**: Gerenciamento de estado global da aplicação
- **src/utils/**: Funções utilitárias, helpers e formatadores

---

## 4. Padrões, Convenções e Boas Práticas

### 4.1 Padrões de Projeto (Design Patterns)

1. **Module Pattern**
   - Organização do código em módulos independentes por domínio de negócio
   - Cada módulo encapsula suas próprias interfaces, serviços e componentes

2. **Service Pattern**
   - Encapsulamento de chamadas à API em serviços específicos
   - Separação clara entre lógica de UI e comunicação com backend

3. **Repository Pattern**
   - Implementado através dos serviços que abstraem o acesso aos dados
   - Centraliza a lógica de acesso a dados e manipulação de respostas

4. **Component Composition**
   - Construção de interfaces complexas através da composição de componentes menores
   - Reutilização de componentes em diferentes contextos

5. **Adapter Pattern**
   - Adaptação de dados entre formatos da API e formatos utilizados pela UI
   - Implementado principalmente nos serviços

### 4.2 Convenções de Código

1. **Nomenclatura**
   - **Componentes React**: PascalCase (ex: [DemonstrativoAnaliticoDocument](cci:1://file:///home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/src/modules/dados-producao/extratos-financeiros/templates/demonstrativo-analitico-document/DemonstrativoAnaliticoDocument.tsx:72:0-130:2))
   - **Interfaces**: Prefixo "I" + PascalCase (ex: `IDadosCooperado`)
   - **Serviços**: PascalCase + "Service" (ex: `ExtratosFinanceirosService`)
   - **Funções**: camelCase (ex: `formatCurrencyWithoutSymbol`)

2. **Estrutura de Arquivos**
   - Cada módulo segue a mesma estrutura interna (interfaces, pages, services)
   - Componentes complexos podem ter seu próprio diretório com arquivos auxiliares

3. **Importações**
   - Importações organizadas por origem (externos, internos, relativos)
   - Evita-se importações circulares através da organização hierárquica

### 4.3 Boas Práticas

1. **Tipagem Forte**
   - Uso extensivo de TypeScript para garantir segurança de tipos
   - Interfaces bem definidas para dados da API e props de componentes

2. **Componentização**
   - Componentes pequenos e focados em uma única responsabilidade
   - Reutilização de componentes através de props e composição

3. **Gerenciamento de Estado**
   - Estado global armazenado no sessionStorage para persistência entre recargas
   - Estado local gerenciado com hooks do React (useState, useEffect)

4. **Tratamento de Erros**
   - Interceptadores globais para tratamento de erros de API
   - Redirecionamento automático para login em caso de sessão expirada

5. **Segurança**
   - Validação de token JWT no cliente
   - Verificação de expiração de token antes de requisições
   - Armazenamento seguro de dados sensíveis

---

## 5. Fluxo de Dados Típico

### 5.1 Fluxo de Autenticação

1. **Entrada do Usuário**
   - Usuário insere credenciais na página de login (`/modules/autenticacao/pages/login`)

2. **Validação e Envio**
   - O componente de login valida os dados básicos (formato, campos obrigatórios)
   - Chama o serviço de autenticação ([LoginService.validarAcesso()](cci:1://file:///home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/src/modules/autenticacao/services/Login.service.ts:10:4-14:5))

3. **Comunicação com API**
   - O serviço utiliza a função [post()](cci:1://file:///home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/src/config/api.ts:70:0-80:1) da configuração de API
   - Envia credenciais para o endpoint `/authenticate/v1/validar-acesso`

4. **Processamento da Resposta**
   - API retorna token JWT e dados básicos do usuário
   - O serviço processa a resposta e extrai os dados relevantes

5. **Armazenamento de Estado**
   - Token JWT e dados do usuário são armazenados via `AuthenticationStorage`
   - Utiliza `sessionStorage` para persistir os dados durante a sessão

6. **Redirecionamento**
   - Usuário é redirecionado para a página inicial ou página solicitada anteriormente

### 5.2 Fluxo de Consulta de Dados

1. **Renderização Inicial**
   - Componente de página é montado (ex: `DemonstrativosPage`)
   - Hook `useEffect` dispara carregamento inicial de dados

2. **Requisição de Dados**
   - Componente chama serviço específico (ex: [ExtratosFinanceirosService.getCompetencias()](cci:1://file:///home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/src/modules/dados-producao/extratos-financeiros/services/ExtratosFinanceiros.service.ts:20:2-23:3))
   - Serviço utiliza função [get()](cci:1://file:///home/squadra/Documentos/UNIMED/cooperado/CanalWebReact/src/config/api.ts:58:0-68:1) da configuração de API

3. **Interceptação da Requisição**
   - Interceptador do Axios adiciona token JWT ao header `Authorization`
   - Se aplicável, adiciona headers de simulação para operadores

4. **Comunicação com API**
   - Requisição é enviada para o endpoint correspondente
   - API processa a requisição e retorna dados

5. **Processamento da Resposta**
   - Serviço recebe resposta e extrai dados relevantes
   - Em caso de erro, interceptador trata códigos de status específicos (401, 403)

6. **Atualização do Estado**
   - Componente atualiza estado local com `useState`
   - Renderização é atualizada com novos dados

7. **Transformação e Exibição**
   - Dados são transformados conforme necessário (formatação, agrupamento)
   - Componentes de UI renderizam os dados processados

---

## 6. Glossário Técnico

| Termo | Descrição |
|-------|-----------|
| **SPA** | Single-Page Application - Aplicação web que carrega uma única página HTML e atualiza dinamicamente o conteúdo conforme o usuário interage |
| **JWT** | JSON Web Token - Padrão para transmissão segura de informações entre partes como um objeto JSON |
| **React** | Biblioteca JavaScript para construção de interfaces de usuário baseada em componentes |
| **TypeScript** | Superset tipado de JavaScript que compila para JavaScript puro |
| **Material UI** | Biblioteca de componentes React que implementa o Material Design da Google |
| **Axios** | Cliente HTTP baseado em Promises para navegador e Node.js |
| **Cooperado** | Médico associado à cooperativa UNIMED |
| **Demonstrativo Analítico** | Relatório detalhado de produção médica e pagamentos |
| **Licença Remunerada** | Benefício que permite ao cooperado se ausentar mantendo remuneração |
| **Bolsa de Trocas** | Sistema que permite troca de períodos de licença entre cooperados |
| **CMS** | Content Management System - Sistema de gerenciamento de conteúdo integrado ao portal |
| **Simulação de Acesso** | Recurso que permite a administradores acessarem o portal como se fossem um cooperado específico |

---

## 7. Considerações de Segurança

### 7.1 Autenticação e Autorização

- Autenticação baseada em token JWT com tempo de expiração
- Verificação de token em todas as requisições via interceptador Axios
- Redirecionamento automático para login em caso de token inválido ou expirado
- Suporte para autenticação de dois fatores

### 7.2 Proteção de Dados

- Dados sensíveis armazenados apenas em sessionStorage (não persistem após fechamento do navegador)
- Tokens e dados de simulação codificados em base64 para transmissão
- Headers personalizados para identificação de sessões simuladas

### 7.3 Tratamento de Erros

- Interceptadores globais para tratamento uniforme de erros de API
- Tratamento específico para erros de autenticação (401) e autorização (403)
- Feedback visual para o usuário em caso de falhas

---

## 8. Integração com Sistemas Externos

### 8.1 Biblioteca de Componentes

- Integração com biblioteca própria `@unimedcampinas/componentes-react-ts`
- Componentes compartilhados entre diferentes aplicações da UNIMED
- Mantida em repositório separado com versionamento próprio

### 8.2 Sistemas Legados

- Integração com sistemas legados via redirecionamento e tokens
- Endpoint específico para geração de tokens de acesso a sistemas externos
- Suporte para recebimento de tokens externos para autenticação cruzada

### 8.3 Geração de Documentos

- Integração com `@react-pdf/renderer` para geração de PDFs dinâmicos
- Templates específicos para diferentes tipos de relatórios e demonstrativos
- Suporte para visualização e download de documentos gerados

---

**Desenvolvido pela equipe SQUADRA**

O documento de arquitetura que criei para o Portal do Cooperado UNIMED está completo e pronto para ser utilizado na wiki interna. Ele abrange todos os aspectos solicitados:

1. **Visão Geral**: Descreve o propósito do projeto e seus principais usuários.
2. **Arquitetura Geral**: Detalha o padrão arquitetural (SPA com arquitetura modular em camadas) e as responsabilidades de cada camada.
3. **Estrutura de Pastas**: Apresenta a organização do código-fonte com explicações sobre cada diretório principal.
4. **Padrões e Convenções**: Lista os design patterns utilizados e as convenções de código adotadas.
5. **Fluxo de Dados**: Descreve o ciclo de vida de requisições típicas, desde a autenticação até a consulta de dados.
6. **Glossário Técnico**: Define termos técnicos e de negócio relevantes para o projeto.

Adicionalmente, incluí seções sobre considerações de segurança e integração com sistemas externos, que são aspectos importantes para a compreensão completa da arquitetura.

Este documento servirá como referência valiosa para novos desenvolvedores que se juntarem ao projeto, bem como para documentação técnica do sistema.

# Guia de Instalação

## 1. Clonar os repositórios

```bash
# Clone o repositório principal
git clone https://dev.azure.com/unimedcampinas/Global/_git/CanalWebReact

# Clone o repositório da biblioteca de componentes
git clone https://dev.azure.com/unimedcampinas/Global/_git/react-components
```

## 2. Instalar e configurar a biblioteca de componentes

A versão da biblioteca de componentes que será feito o build é determinada pela tag especificada no repositório. Por exemplo, se você deseja usar a versão v4.7.0. No `package-prod.json` é possível consultar a versão que será usada:

```JSON
{
    "dependencies": {
        "@unimedcampinas/react-components": "^4.7.0"
    }
}
```

```bash
# Entre no diretório da biblioteca de componentes
cd react-components

# Verifique as tags disponíveis
git tag -l

# Faça checkout para a tag específica
git checkout v4.7.0

# Instale as dependências e faça o build local
npm install
npm run build:local # ou simplesmente npm run build
```

Isso garantirá que você esteja usando exatamente a versão v4.7.0 da biblioteca de componentes em seu projeto.

## 4. Instalar dependências do projeto principal

```bash
# Entre no diretório do projeto principal
cd ../CanalWebReact

# Instale as dependências
npm install
```

**Alternativa:** Se não quiser instalar a biblioteca de componentes localmente, você pode usar o arquivo `package-prod.json` (requer autenticação Azure Artifacts [4.1 e 4.2]):

```bash
# Substitua o package.json pelo package-prod.json
cp package-prod.json package.json

# Instale as dependências
npm install
```

### 4.1 Autenticação Azure Artifacts VSTS

   ```bash
   # Instale o serviço de autenticação do Azure globalmente
   npm install -g vsts-npm-auth
   
   # Realize a autenticação
   vsts-npm-auth -config .npmrc
   ```

### 4.2. Autenticação Azure Artifacts PAT

1. Crie um token de acesso pessoal no Azure DevOps com permissões de leitura de pacotes
2. Configure a variável de ambiente AZURE_DEVOPS_PAT:

```bash
# No Linux/macOS
export AZURE_DEVOPS_PAT=seu_token_aqui

# No Windows (PowerShell)
$env:AZURE_DEVOPS_PAT="seu_token_aqui"

# No Windows (CMD)
set AZURE_DEVOPS_PAT=seu_token_aqui
```

3. Verifique se o arquivo .npmrc contém as configurações corretas para os registros do FontAwesome e do Azure DevOps

## 5. Iniciar o projeto

```bash
# Entre no diretório do projeto principal
cd CanalWebReact

# Inicie o servidor de desenvolvimento
npm start
```

O aplicativo estará disponível em http://localhost:3000