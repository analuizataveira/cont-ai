# 📊 ContAI - Gerenciador de Lançamentos Financeiros

**ContAI** é uma aplicação **Fullstack** desenvolvida para o desafio técnico da **Scoder Tech Studio**. O sistema permite o cadastro, consulta e organização de lançamentos financeiros por mês e ano, facilitando o controle financeiro de contabilidade.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas, separando responsabilidades entre frontend e backend:

- **Frontend:** Aplicação React com TypeScript, responsável pela interface do usuário e comunicação com a API.
- **Backend:** API RESTful construída com Node.js, Express e TypeScript, utilizando TypeORM para acesso ao banco de dados PostgreSQL.
- **Testes:** Implementados com Jest para garantir a qualidade do código.
- **CI/CD:** Pipeline automatizado via GitHub Actions para build, testes e deploy contínuo.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagens:** TypeScript (frontend e backend), SQL (PostgreSQL)
- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, TypeORM, PostgreSQL
- **Testes:** Jest
- **DevOps:** Docker, GitHub Actions

---

## 🚀 Funcionalidades

- Cadastro de lançamentos financeiros (data, descrição, valor, tipo)
- Visualização de lançamentos filtrados por mês e ano
- Totais mensais de créditos e débitos

---

## 📚 Documentação da API

A documentação interativa da API está disponível via Swagger:

[https://cont-ai-back.onrender.com/api-docs](https://cont-ai-back.onrender.com/api/docs)

---

## 🧑‍💻 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm (ou yarn)
- Docker

### 1. Clone o repositório

```bash
git clone https://github.com/analuizataveira/contai.git
cd contai
```

### 2. Configuração do Backend

```bash
cd backend/cont-ai
npm install
npm run dev
```

### 3. Configuração do Frontend

```bash
cd ../../frontend/cont-ai
npm install
npm run dev
```

Ou acesse a versão online do frontend:  
[https://cont-ai-front.onrender.com](https://cont-ai-front.onrender.com)

---

### 4. Executando os Testes

Para rodar os testes automatizados do backend:

```bash
cd backend/cont-ai
npm test
```


## 🤝 Contato

Dúvidas ou sugestões? Entre em contato pelo [LinkedIn](https://www.linkedin.com/in/analuizataveira/).
