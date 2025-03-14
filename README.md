
Este projeto utiliza **Next.js**, **Prisma**, **PostgreSQL**, e **Tailwind CSS** para o frontend e backend. Abaixo estão as instruções de como configurar e executar o projeto utilizando Docker e Docker Compose.

## Requisitos

- Docker
- Docker Compose
- Node.js

## Passos para executar o projeto

### 1. Clonar o repositório

Primeiro, clone o repositório do projeto em sua máquina local:

```bash
git clone https://github.com/Igor265/laughing-robot
cd laughing-robot
```

### 2. Configurar o Docker

O projeto utiliza Docker e Docker Compose para configurar o banco de dados PostgreSQL. Certifique-se de que o Docker está instalado corretamente.

### 3. Configurar as variáveis de ambiente

```
DATABASE_URL=postgresql://root:password@localhost:5432/ecommerce?schema=public
```

### 4. Iniciar o PostgreSQL com Docker Compose

```bash
docker compose up -d
```

### 5. Instalar as dependências do projeto

```bash
npm install
```
### 6. Configurar o banco de dados com Prisma

```bash
npx prisma migrate
npx prisma db seed
```

### 7. Executar o projeto
