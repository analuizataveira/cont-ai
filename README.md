# 📊 ContAI - Financial Records Manager

Este projeto é uma aplicação **Fullstack** desenvolvida como parte de um desafio técnico da **Scoder Tech Studio**. A aplicação permite o **cadastro e visualização de lançamentos financeiros**, organizados por mês e ano, para a empresa **ContAI**.

## 🚀 Funcionalidades

- **Cadastro de lançamentos financeiros**:
    - Data (DD/MM/AAAA)
    - Descrição
    - Valor (positivo)
    - Tipo (Crédito/Débito)
- **Visualização dos lançamentos**:
    - Tabela por mês e ano
    - Totais mensais de créditos e débitos

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, TypeScript, TypeORM, PostgreSQL
- **Testes:** Jest (`npm test`)

---

## 🧑‍💻 Como Rodar o Projeto

### 🔧 Requisitos

- Node.js 18+
- npm (ou yarn)
- Docker

### 🔁 Clonando o repositório

```bash
git clone https://github.com/analuizataveira/contai.git
cd contai
```

### ⚙️ Configuração do Backend

Acesse a pasta do backend e instale as dependências:

```bash
cd backend/cont-ai
npm install
```

Inicie o servidor:

```bash
npm run dev
```

### 💻 Configuração do Frontend

Acesse a pasta do frontend e instale as dependências:

```bash
cd frontend/cont-ai
npm install
```

Inicie a aplicação localmente:

```bash
npm run dev
```

Ou, se preferir, acesse a versão online do frontend em:  
[https://cont-ai-front.onrender.com](https://cont-ai-front.onrender.com)

### 🧪 Executando os Testes

Acesse a pasta do backend e execute:

```bash
cd backend/cont-ai
npm test
```
