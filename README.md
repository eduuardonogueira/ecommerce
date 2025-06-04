
# 🛒 Furniro E-commerce

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://stage-ecommerce.vercel.app)

Este é um projeto de E-commerce desenvolvido com foco em boas práticas, utilizando tecnologias modernas no backend e frontend.  

## 🔗 Acesse o projeto  
➡️ [https://stage-ecommerce.vercel.app](https://stage-ecommerce.vercel.app)  

---

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** — Framework para aplicações Node.js escaláveis.
- **Prisma ORM** — Mapeamento objeto-relacional para integração com banco de dados.
- **TypeScript** — Superset do JavaScript que adiciona tipagem estática.
- **PostgreSQL** — Banco de dados relacional.

### Frontend
- **React** (puro) — Biblioteca JavaScript para construção de interfaces.
- **TypeScript** — Segurança de tipos e melhor DX.
- **Axios** — Cliente HTTP para comunicação com a API.
- **Modules.scss** — Estilização modular e reaproveitável.

---

## 📝 Funcionalidades

- ✅ Listagem de produtos com filtros por categoria.  
- ✅ Página de detalhes para cada produto.  
- ✅ Página que exibe todos os produtos disponíveis.  
- ✅ Integração completa entre frontend e backend via API RESTful.  

---

## 📂 Estrutura do Projeto

```plaintext
./
├── backend/
└── frontend/
```
---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos:
- Node.js >= 18.x
- PostgreSQL
- npm ou npm

### Backend
```bash
cd backend
npm install
# ou npm install

# configure o arquivo .env com as credenciais do PostgreSQL

npx prisma migrate dev
npm start:dev
```

### Frontend
```bash
cd frontend
npm install
# ou npm install

npm run dev
```

---

## 🗃️ Banco de Dados
- Configurado com **PostgreSQL** e gerenciado via **Prisma ORM**.
- Estrutura principal:  
  - Categorias  
  - Produtos  

---

## ✅ Próximos passos

- [ ] Implementar carrinho de compras.  
- [ ] Sistema de autenticação e painel de administração.  
- [ ] Checkout com integração de pagamento.  

---

## 🤝 Contribuições
Sinta-se à vontade para abrir issues ou pull requests!

---

## 📝 Licença
Este projeto está sob a licença MIT.  
