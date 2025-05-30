# 💰 Investimentos App

Sistema de gerenciamento de clientes e ativos financeiros para escritório de investimentos.

## 🛠️ Stack Tecnológica

- **Backend:** Node.js + Fastify + Prisma + MySQL
- **Frontend:** Next.js + ShadCN + React Query + React Hook Form + Zod + Axios
- **Infraestrutura:** Docker Compose
- **Linguagem:** 100% TypeScript

## 📋 Funcionalidades

1. **Gestão de Clientes**
   - Cadastro de clientes (nome, email, status)
   - Listagem e edição de clientes
   - Status ativo/inativo

2. **Gestão de Ativos**
   - Listagem de ativos financeiros
   - Visualização de alocações por cliente
   - Valores atuais dos ativos

## 🚀 Como executar

```bash
# Clonar e entrar no diretório
cd investimentos-app

# Executar com Docker Compose
docker-compose up -d

# Frontend estará disponível em: http://localhost:3000
# Backend estará disponível em: http://localhost:3001
```

## 📁 Estrutura do Projeto

```
investimentos-app/
├── backend/          # API Fastify + Prisma
├── frontend/         # Next.js App
├── docker-compose.yml
└── README.md
```

## ⏰ Cronograma de Desenvolvimento

- [x] **Fase 1:** Setup e Configuração Base
- [ ] **Fase 2:** Backend - CRUD Clientes  
- [ ] **Fase 3:** Backend - Ativos
- [ ] **Fase 4:** Frontend - Base
- [ ] **Fase 5:** Frontend - Clientes
- [ ] **Fase 6:** Frontend - Ativos
- [ ] **Fase 7:** Finalização

---

**Prazo:** 06/06/2025 (1 semana)
