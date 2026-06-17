# 2GO - Plataforma de Roteiros Inteligentes (React + Vite)

Este repositório contém o frontend institucional moderno da **2GO**, uma startup de tecnologia de viagem que utiliza inteligência artificial para criar roteiros personalizados completos em poucos minutos.

O design da plataforma foi estruturado para ser inspirador, moderno e premium, equilibrando a leveza visual de viagem com acabamento tecnológico de ponta, misturando referências estéticas da **Apple**, **Airbnb**, **Duolingo** e **Linear**.

> [!IMPORTANT]
> **Posicionamento de Marca**: A 2GO **não** é uma agência de viagens tradicional. É uma startup de tecnologia. O nome correto da marca é estritamente **2GO** (evitar variações como *2GO Travel* ou *2GO Roteiros*). O objetivo principal do site é convencer o usuário a criar um roteiro dentro da aplicação.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces modulares.
- **Vite 8** - Bundler ultra-rápido para desenvolvimento frontend.
- **Tailwind CSS v4** - Framework utilitário de estilização moderna.
- **Lucide React** - Conjunto de ícones vetoriais leves e consistentes.

---

## 📦 Instalação e Configuração

Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone o repositório ou navegue até a pasta do projeto:
   ```bash
   cd 2go-travel-react
   ```

2. Instale as dependências necessárias:
   ```bash
   npm install
   ```

---

## 🚀 Como Rodar o Projeto

Para iniciar o servidor de desenvolvimento local com Hot Module Replacement (HMR):

```bash
npm run dev
```

O projeto estará disponível por padrão no endereço: `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, estão configurados os seguintes comandos:

- `npm run dev`: Inicializa o servidor local de desenvolvimento (Vite).
- `npm run build`: Compila os arquivos para produção na pasta `/dist`.
- `npm run preview`: Executa um servidor local simulando o ambiente de produção com o build gerado.
- `npm run lint`: Analisa o código em busca de erros de sintaxe ou fora do padrão com o ESLint.

---

## 📁 Estrutura de Pastas

A estrutura interna do diretório `/src` está organizada da seguinte forma:

```text
2go-travel-react/
├── dist/                  # Arquivos compilados para produção
├── public/                # Assets estáticos globais (favicon, etc.)
├── src/
│   ├── assets/            # Imagens reais de destinos (png/jpg) e mockups do app
│   ├── components/        # Componentes modulares reutilizáveis
│   │   ├── Header.jsx           # Cabeçalho global com menu de seções
│   │   ├── Footer.jsx           # Rodapé global institucional e links úteis
│   │   ├── AppDownloadModal.jsx # Modal com QR Code e links de download
│   │   └── ...                  # Outros componentes funcionais
│   ├── pages/             # Telas principais da aplicação
│   │   ├── Home.jsx             # Home Page com simulador interativo da IA
│   │   ├── Planner.jsx          # Tela do assistente de roteiros
│   │   ├── Blog.jsx             # Artigos e notícias de viagem
│   │   └── ...
│   ├── App.jsx            # Componente raiz, controle de rotas e modais
│   ├── index.css          # Design System, variáveis de cores e botões
│   └── main.jsx           # Ponto de entrada do React
├── eslint.config.js       # Regras de padronização do código
├── vite.config.js         # Configurações do Vite e plugins
└── package.json           # Dependências e scripts do Node.js
```

---

## 🏗️ Como Fazer o Build de Produção

Para compilar o código de forma otimizada para publicação:

```bash
npm run build
```

O comando irá criar uma pasta `/dist` contendo o HTML, CSS minificado e os pacotes JavaScript otimizados (com suporte a lazy loading de chunks).

---

## 🎨 Observações de Design & Desenvolvimento

Para manter a consistência visual premium desenvolvida, siga as diretrizes abaixo:

1. **Paleta de Cores Obrigatória**:
   - **Azul Marinho (`#081B6B`)**: Usado de forma elegante para estruturas primárias, títulos e cabeçalhos. Evite excesso para o site não parecer corporativo/financeiro.
   - **Laranja (`#F47A20`)**: Usado em CTAs primários, botões interativos e elementos divertidos de destaque.
   - **Verde (`#96AB21`)**: Aplicado em badges, tags de estilo de viagem, status e conexões de timeline.
   - **Branco (`#FFFFFF`) / Cinza Claro (`#F7F8FA`)**: Fundo predominante garantindo muito respiro visual (white space).

2. **Tipografia**:
   - Títulos (`h1`, `h2`, `h3`): **Plus Jakarta Sans** (estilo moderno e encorpado).
   - Textos e parágrafos: **Inter** (alta legibilidade em telas móveis).

3. **Navegação**:
   - Separar a navegação pura do menu do Header (*Como Funciona*, *Destinos*, *Seu Roteiro Ganha Vida*, *Blog*, *Contato*) dos títulos de conversão de marketing e vendas aplicados nas seções.

---

## 🌐 Informações de Deploy

Este projeto está pronto para integração de deploy contínuo (CI/CD) em plataformas web modernas:
- **Hospedagem Recomendada**: Vercel, Netlify ou Firebase App Hosting.
- Ao conectar o repositório a uma dessas ferramentas, qualquer push na branch `main` disparará automaticamente o processo de build (`npm run build`) e publicará a nova versão em produção em segundos.
# 2go-travel-react
