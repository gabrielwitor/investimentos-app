# 💰 InvestApp Pro - Sistema de Gestão de Investimentos

> **Plataforma completa de gerenciamento de clientes e ativos financeiros para escritórios de investimentos modernos**

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.3-green?logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

O **InvestApp Pro** é uma aplicação web de última geração desenvolvida especificamente para escritórios de investimentos que exigem uma solução robusta, escalável e visualmente atraente para gerenciar carteiras de clientes e acompanhar ativos financeiros.

## ✨ Características Principais

### 🏢 **Gestão de Clientes**
- ✅ Cadastro completo (nome, email, status)
- ✅ Listagem com filtros e paginação
- ✅ Edição de informações
- ✅ Controle de status (ativo/inativo)
- ✅ Busca avançada por nome/email

### 📈 **Gestão de Ativos**
- ✅ Catálogo de ativos financeiros
- ✅ Diferentes tipos (Ações, FIIs, CDBs, etc.)
- ✅ Visualização detalhada de ativos
- ✅ Alocações por cliente
- ✅ Interface responsiva

### 📊 **Dashboard Executivo**
- ✅ Estatísticas em tempo real
- ✅ Resumo de clientes ativos/inativos
- ✅ Total de ativos disponíveis
- ✅ Patrimônio total investido
- ✅ Alocações ativas no sistema

### 🎨 **Interface Moderna**
- ✅ Design system baseado em gradientes
- ✅ Efeitos glass-morphism
- ✅ Animações suaves
- ✅ Totalmente responsiva
- ✅ Navegação intuitiva

## 🛠️ Stack Tecnológica

### **Backend**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Fastify** | 5.3.3 | Framework web performático |
| **Prisma** | 6.8.2 | ORM type-safe |
| **MySQL** | 8.0 | Banco de dados relacional |
| **Zod** | 3.25.42 | Validação de schemas |
| **TypeScript** | 5.8+ | Tipagem estática |

### **Frontend**
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 15.3.3 | Framework React |
| **ShadCN/UI** | Latest | Sistema de componentes |
| **React Query** | 5.79.0 | Gerenciamento de estado |
| **React Hook Form** | 7.56.4 | Gerenciamento de formulários |
| **Tailwind CSS** | 4.0 | Framework CSS |
| **Lucide React** | 0.511.0 | Biblioteca de ícones |
| **Axios** | 1.9.0 | Cliente HTTP |

### **Infraestrutura**
- **Docker & Docker Compose** - Containerização
- **MySQL 8.0** - Banco de dados
- **Environment Variables** - Configuração segura

## 🚀 Guia de Instalação e Execução

### **Pré-requisitos**
- Docker e Docker Compose instalados
- Git para clonagem do repositório
- Porta 3000, 3001 e 3306 disponíveis

### **Instalação Rápida com Docker** ⚡

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/investimentos-app.git
cd investimentos-app

# 2. Executar com Docker Compose (tudo automatizado!)
docker-compose up -d

# 3. Aguardar inicialização (cerca de 2-3 minutos)
# ✅ Frontend: http://localhost:3000
# ✅ Backend API: http://localhost:3001
# ✅ Database: localhost:3306

# 4. (Opcional) Popular com dados de exemplo
docker-compose exec backend npm run db:seed
```

> **🎉 Pronto!** Sua aplicação está rodando em http://localhost:3000

### **Desenvolvimento Local (Opcional)** 🔧

Para desenvolvimento com hot-reload:

```bash
# Terminal 1 - Backend
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev

# Terminal 2 - Frontend  
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### **Variáveis de Ambiente**

O projeto utiliza as seguintes variáveis de ambiente:

```env
# Backend
NODE_ENV=development
PORT=3001
DATABASE_URL=mysql://app_user:app_password_secure@db:3306/investimentos

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📁 Estrutura do Projeto

```
investimentos-app/
├── 📁 backend/                 # API Fastify + Prisma
│   ├── 📁 prisma/             # Schema e migrações
│   ├── 📁 src/
│   │   ├── 📁 routes/         # Rotas da API
│   │   ├── 📁 services/       # Lógica de negócio
│   │   ├── 📁 schemas/        # Validações Zod
│   │   └── index.ts           # Entrada da aplicação
│   ├── Dockerfile
│   └── package.json
├── 📁 frontend/               # Next.js App
│   ├── 📁 src/
│   │   ├── 📁 app/           # Pages e layouts
│   │   ├── 📁 components/    # Componentes React
│   │   ├── 📁 hooks/         # Custom hooks
│   │   ├── 📁 lib/           # Utilitários
│   │   └── 📁 types/         # Tipos TypeScript
│   ├── components.json       # Config ShadCN
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml         # Orquestração de containers
└── README.md                 # Este arquivo
```

## 🔗 Endpoints da API

### **Health Check**
```
GET    /health                # Status da API
GET    /                      # Informações da API
```

### **Clientes**
```
GET    /api/clientes              # Listar clientes (com paginação e filtros)
POST   /api/clientes              # Criar cliente
GET    /api/clientes/:id          # Buscar cliente por ID
PUT    /api/clientes/:id          # Atualizar cliente
DELETE /api/clientes/:id          # Deletar cliente
```

### **Ativos**
```
GET    /api/ativos                # Listar ativos (com paginação e filtros)
GET    /api/ativos/:id            # Buscar ativo por ID
```

### **Alocações**
```
GET    /api/alocacoes             # Listar todas as alocações
POST   /api/alocacoes             # Criar nova alocação
GET    /api/alocacoes/:id         # Buscar alocação por ID
PUT    /api/alocacoes/:id         # Atualizar alocação
DELETE /api/alocacoes/:id         # Deletar alocação
GET    /api/clientes/:clienteId/alocacoes  # Alocações de um cliente específico
```

### **Dashboard**
```
GET    /api/dashboard/stats       # Estatísticas gerais do sistema
```

## 🎨 Screenshots & Demonstração

### 🏠 Dashboard Principal
<div align="center">
  <img src="https://via.placeholder.com/800x500/0f172a/ffffff?text=Dashboard+com+Estatísticas+em+Tempo+Real" alt="Dashboard Principal" style="border-radius: 8px; margin: 10px;">
  <p><em>Dashboard executivo com estatísticas em tempo real e design moderno</em></p>
</div>

### 👥 Gestão de Clientes
<div align="center">
  <img src="https://via.placeholder.com/800x500/1e40af/ffffff?text=Listagem+e+Edição+de+Clientes" alt="Gestão de Clientes" style="border-radius: 8px; margin: 10px;">
  <p><em>Interface intuitiva para cadastro e gerenciamento de clientes</em></p>
</div>

### 📈 Catálogo de Ativos
<div align="center">
  <img src="https://via.placeholder.com/800x500/059669/ffffff?text=Visualização+de+Ativos+Financeiros" alt="Catálogo de Ativos" style="border-radius: 8px; margin: 10px;">
  <p><em>Catálogo completo de ativos com informações detalhadas</em></p>
</div>

### 🔗 Sistema de Alocações
<div align="center">
  <img src="https://via.placeholder.com/800x500/7c2d12/ffffff?text=Alocações+Cliente+x+Ativo" alt="Sistema de Alocações" style="border-radius: 8px; margin: 10px;">
  <p><em>Gerenciamento visual de alocações de investimentos</em></p>
</div>

## 🧪 Guia de Teste Completo

### **🚀 Quick Start - Testando em 5 minutos**

1. **Acesse o Dashboard** → http://localhost:3000
   - Visualize estatísticas em tempo real
   - Observe o design moderno com gradientes
   
2. **Explore Clientes** → `/clientes`
   - Clique em "Novo Cliente" para criar
   - Use a busca para filtrar por nome/email
   - Teste a edição clicando em um cliente
   
3. **Navegue pelos Ativos** → `/ativos`
   - Veja diferentes tipos de investimentos
   - Observe a paginação funcionando
   - Clique em um ativo para ver detalhes
   
4. **Teste Alocações** → Dentro de um cliente
   - Clique em "Ver Alocações"
   - Crie uma nova alocação
   - Observe a relação cliente-ativo

### **📊 Dados de Demonstração**

O sistema inclui dados pré-configurados:

```bash
# Se necessário, repovoar dados
docker-compose exec backend npm run db:reset
docker-compose exec backend npm run db:seed
```

**Dados inclusos:**
- 👥 **8 clientes** de exemplo (6 ativos e 2 inativos)
- 📈 **15 ativos** diversos (ações, FIIs, fundos, renda fixa, tesouro, debêntures)
- 🔗 **22 alocações** pré-configuradas
- 💰 **Patrimônio total**: R$ 600.000,00
- 📊 **Estatísticas** calculadas automaticamente

### **🔧 Teste de API com Postman**

O projeto inclui uma **coleção Postman completa** para testar todos os endpoints da API.

#### **Importar Coleção**
1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `postman-collection.json` na raiz do projeto
4. A coleção será importada com todas as requisições organizadas

#### **Estrutura da Coleção**
- 🏥 **Health Check** - Verificação de status da API
- 👥 **Clientes** - CRUD completo de clientes
- 📈 **Ativos** - Listagem e consulta de ativos
- 🔗 **Alocações** - CRUD completo de alocações
- 📊 **Dashboard** - Estatísticas do sistema
- 🧪 **Testing Scenarios** - Cenários completos de teste
- ❌ **Error Testing** - Teste de casos de erro

#### **Variáveis de Ambiente**
A coleção inclui variáveis para facilitar os testes:
- `{{baseUrl}}` - URL base da API (http://localhost:3001)
- `{{clienteId}}` - ID de cliente para testes
- `{{ativoId}}` - ID de ativo para testes
- `{{alocacaoId}}` - ID de alocação para testes

#### **Como Usar**
1. Execute a API: `docker-compose up -d`
2. Importe a coleção no Postman
3. Execute os requests na ordem:
   - Health Check → ✅ Verificar se API está funcionando
   - Dashboard Stats → 📊 Ver estatísticas iniciais
   - List Clientes → 👥 Listar clientes existentes
   - List Ativos → 📈 Listar ativos disponíveis
   - CRUD Tests → 🧪 Testar operações completas

#### **Cenários de Teste Inclusos**
- ✅ **CRUD Completo** - Cliente e Alocação
- ✅ **Filtros e Busca** - Paginação e filtros
- ✅ **Validações** - Dados inválidos e obrigatórios
- ✅ **Relacionamentos** - Cliente ↔ Ativo ↔ Alocação
- ✅ **Tratamento de Erros** - 404, 400, 409, 500

### **🧪 Teste de Integração Automatizado**

O projeto inclui um script de teste de integração que valida toda a aplicação:

```bash
# Instalar dependências do teste (se necessário)
npm install axios

# Executar teste de integração
node test-integration.js
```

**O que o script testa:**
- 🏥 **Health Check** - Status da API
- 📊 **Dashboard Stats** - Estatísticas do sistema
- 👥 **Clientes API** - CRUD completo
- 📈 **Ativos API** - Listagem e consulta
- 🔗 **Alocações API** - Operações de alocação
- 🌐 **Frontend** - Acessibilidade das páginas
- 🧪 **CRUD Operations** - Teste completo de criação/edição/exclusão

**Resultado esperado:**
```
🚀 Starting InvestApp Pro Integration Tests...
============================================================

🏥 Testing Health Check...
✅ API Health Check: 200

📊 Testing Dashboard Stats...
✅ Dashboard Stats: 200
ℹ️  Total Clientes: 8
ℹ️  Clientes Ativos: 6
ℹ️  Ativos Disponíveis: 15
ℹ️  Patrimônio Total: R$ 600,000
ℹ️  Alocações Ativas: 22

📋 Test Results Summary:
============================================================
✅ Health Check
✅ Dashboard Stats
✅ Clientes API
✅ Ativos API
✅ Alocações API
✅ Frontend Accessibility
✅ CRUD Operations

📊 Overall Results: 7/7 tests passed
🎉 All tests passed! Your application is working correctly.
```

## 🚀 Funcionalidades e Características Técnicas

### **🏗️ Arquitetura de Ponta**
- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **RESTful API** - Endpoints bem estruturados e documentados
- ✅ **Database Migrations** - Versionamento automático do schema
- ✅ **Error Handling** - Tratamento robusto com fallbacks
- ✅ **Loading States** - UX premium com esqueletos animados
- ✅ **Optimistic Updates** - Interface responsiva com React Query

### **🔐 Segurança e Confiabilidade**
- ✅ **Type Safety 100%** - TypeScript em todo o stack
- ✅ **Schema Validation** - Zod em frontend e backend
- ✅ **SQL Injection Protection** - Prisma ORM com queries seguras
- ✅ **CORS Configuration** - Política de origem controlada
- ✅ **Environment Isolation** - Configuração segura por ambiente

### **⚡ Performance e Otimização**
- ✅ **Server-Side Rendering** - Next.js 15 com App Router
- ✅ **Query Caching** - React Query com invalidação inteligente
- ✅ **Bundle Optimization** - Tree-shaking e code splitting
- ✅ **Image Optimization** - Next.js automatic optimization
- ✅ **Database Pooling** - Conexões otimizadas com Prisma

### **🎨 Design System Moderno**
- ✅ **Component Library** - ShadCN/UI como base
- ✅ **Design Tokens** - Cores e espaçamentos consistentes
- ✅ **Gradient System** - Visual identity única
- ✅ **Glass-morphism** - Efeitos modernos de vidro
- ✅ **Micro-interactions** - Animações suaves e responsivas
- ✅ **Accessibility First** - WCAG 2.1 AA compliant

### **🔧 Ferramentas de Qualidade**

- **ESLint + Prettier** - Code formatting automático
- **Husky + lint-staged** - Pre-commit hooks
- **TypeScript Strict** - Máxima type safety
- **Conventional Commits** - Histórico semântico
- **SonarCloud** - Code quality monitoring

### **📚 Padrões de Código**

- **Components** - ShadCN/UI como base, extensions customizadas
- **Hooks** - Custom hooks para lógica reutilizável
- **API Routes** - RESTful com validação Zod
- **Database** - Prisma migrations versionadas
- **Styling** - Tailwind + CSS-in-JS quando necessário

## 🚀 Deploy e Produção

### **🐳 Deploy com Docker**

```bash
# Build das imagens de produção
docker-compose -f docker-compose.yml build

# Deploy completo
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Verificar status dos containers
docker-compose ps
```

### **📋 Checklist de Deploy**

- ✅ Variáveis de ambiente configuradas
- ✅ Banco de dados migrado
- ✅ Dados de seed aplicados (se necessário)
- ✅ Containers funcionando
- ✅ Health check da API funcionando
- ✅ Frontend acessível
- ✅ Endpoints testados

### **🔧 Troubleshooting**

#### **Problema: Containers não iniciam**
```bash
# Verificar logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Recriar containers
docker-compose down
docker-compose up -d --build
```

#### **Problema: Database connection error**
```bash
# Verificar se MySQL está rodando
docker-compose ps db

# Recriar database
docker-compose down
docker volume rm investimentos-app_mysql_data
docker-compose up -d
```

#### **Problema: API não responde**
```bash
# Testar health check
curl http://localhost:3001/health

# Verificar logs do backend
docker-compose logs backend

# Restartar apenas o backend
docker-compose restart backend
```

## 📝 Documentação Adicional

### **🗃️ Estrutura do Banco de Dados**

```sql
-- Principais tabelas
Cliente (id, nome, email, status, timestamps)
Ativo (id, nome, codigo, tipo, descricao, timestamps)
AlocacaoAtivo (id, clienteId, ativoId, valor, timestamps)

-- Relacionamentos
Cliente 1:N AlocacaoAtivo
Ativo 1:N AlocacaoAtivo
```

### **🔄 Fluxos de Dados**

1. **Criação de Cliente** → Validação → Salvamento → Cache Update
2. **Listagem de Ativos** → Cache Check → Database Query → Paginação
3. **Criação de Alocação** → Validação → Verificação de Duplicata → Salvamento
4. **Dashboard Stats** → Aggregate Queries → Cache → Response

### **🎯 Roadmap Futuro**

- 📊 **Relatórios Avançados** - PDF, Excel export
- 🔐 **Autenticação** - JWT, roles, permissions
- 📱 **Progressive Web App** - Offline support
- 🚀 **Performance** - Redis cache, CDN
- 📈 **Analytics** - Métricas de uso, dashboards
- 🌍 **Internacionalização** - Multi-idioma
- 🔔 **Notificações** - Real-time updates
- 🤖 **API Integration** - Cotações em tempo real