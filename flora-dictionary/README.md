# Flora Dictionary

Aplicação web desenvolvida em **Next.js 15** para consulta de palavras em inglês, visualização de fonética, definições, exemplos, sinônimos, histórico de pesquisas e gerenciamento de palavras favoritas.

O projeto foi desenvolvido como avaliação técnica front-end, com foco em experiência do usuário, componentização, TypeScript, App Router, boas práticas de organização, consumo de API externa, acessibilidade, testes básicos e layout responsivo.

## Funcionalidades implementadas

* Cadastro de usuário com validação client-side.
* Login com validação de campos, feedback de erro e redirecionamento após autenticação.
* Criação de token simulado via cookie HTTP-only.
* Logout com remoção do cookie e redirecionamento para a tela de login.
* Proteção visual das rotas internas.
* Dashboard com acesso ao dicionário, favoritos e histórico.
* Busca de palavras em inglês com debounce.
* Histórico de pesquisas recentes por usuário.
* Consulta de detalhes da palavra usando API externa.
* Exibição de:

  * palavra;
  * fonética;
  * áudio de pronúncia, quando disponível;
  * definições;
  * exemplos;
  * sinônimos.
* Botão para favoritar e desfavoritar palavras com feedback visual.
* Página de favoritos com:

  * listagem de todas as palavras favoritadas;
  * remoção direta de favoritos;
  * link para abrir os detalhes da palavra;
  * exibição progressiva dos favoritos.
* Dicionário completo com:

  * listagem paginada de palavras;
  * filtro textual;
  * filtro por letra do alfabeto;
  * botão para limpar filtro;
  * modal de detalhes ao clicar em uma palavra.
* Tema claro e escuro com `next-themes`.
* Alternância manual entre tema light e dark.
* Layout responsivo para desktop e mobile.
* Estados de loading, erro e empty state nos principais fluxos.
* Componentização de telas, cards, formulários, estados visuais, filtros, paginação e regras de armazenamento.
* Testes básicos de formulário e estado vazio com Vitest e React Testing Library.

## Stack utilizada

* [Next.js](https://nextjs.org/) 15
* React
* TypeScript
* Tailwind CSS
* App Router
* Lucide React
* Sonner
* next-themes
* Free Dictionary API
* Vitest
* React Testing Library
* Testing Library user-event
* Testing Library jest-dom
* jsdom

## Estrutura principal do projeto

```txt
app/
  api/
    auth/
      login/
      logout/
  dashboard/
  dictionary/
  favorites/
  login/
  signup/

components/
  auth/
  dashboard/
  layout/
  providers/
  ui/
  word/

data/
  words.ts

hooks/
  use-debounce.ts

lib/
  auth-storage.ts
  favorites-storage.ts
  recent-searches-storage.ts

services/
  dictionary-service.ts
  words-service.ts

types/
  dictionary.ts
  favorite.ts
  recent-search.ts
```

## Principais decisões técnicas

### Next.js App Router

O projeto utiliza o **App Router** do Next.js, mantendo as páginas dentro da pasta `app/`.

As páginas são mantidas como Server Components sempre que possível, enquanto componentes com interação, estado, acesso ao `localStorage`, eventos de clique ou hooks de navegação utilizam `"use client"`.

### TypeScript

A aplicação foi desenvolvida com TypeScript, incluindo tipos específicos para:

* entradas do dicionário;
* favoritos;
* histórico de buscas;
* usuários cadastrados;
* respostas paginadas da listagem de palavras.

### Tema light e dark

O projeto possui suporte a **tema claro e escuro** utilizando `next-themes`.

A alternância de tema é feita manualmente pelo usuário por meio de um botão flutuante na interface. O tema é aplicado por classe no HTML, permitindo estilização com Tailwind CSS usando variantes `dark`.

Também foi utilizado `suppressHydrationWarning` no layout para evitar inconsistências de hidratação relacionadas ao tema e a extensões do navegador que podem injetar atributos no HTML.

### Autenticação e sessão

A autenticação foi implementada de forma simulada para fins de avaliação técnica front-end.

O cadastro de usuários é salvo no `localStorage`. No login, a aplicação chama uma rota interna:

```txt
POST /api/auth/login
```

Essa rota cria um cookie HTTP-only chamado:

```txt
flora_token
```

O logout chama:

```txt
POST /api/auth/logout
```

E remove o cookie da sessão, além de redirecionar o usuário para a tela de login.

Em um ambiente real, essa estrutura poderia ser integrada a um backend com geração de JWT real, persistência de usuários e validação de credenciais no servidor.

### Armazenamento por usuário

Favoritos e histórico de buscas são armazenados no `localStorage`, com chave separada por usuário autenticado. Isso evita que favoritos e histórico de um usuário apareçam para outro.

### Consumo da API externa

Os detalhes das palavras são buscados por meio da Free Dictionary API:

```txt
https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

A API pública utilizada fornece detalhes por palavra, mas não disponibiliza um endpoint oficial para listagem completa e paginada de todas as palavras.

Por isso, a listagem do dicionário completo foi implementada com uma base local em:

```txt
data/words.ts
```

Essa base é acessada por meio de uma camada de service:

```txt
services/words-service.ts
```

Dessa forma, a aplicação fica preparada para trocar a fonte local por uma API real no futuro, sem alterar o componente de interface.

Hoje a estrutura funciona assim:

```txt
CompleteDictionary
  -> getPaginatedWords()
    -> data/words.ts
```

Em uma API real, bastaria alterar o service para algo como:

```txt
CompleteDictionary
  -> getPaginatedWords()
    -> GET /api/words?page=1&limit=12&search=energy
```

### Componentização

O projeto foi organizado para separar responsabilidades entre telas, componentes visuais, services e helpers.

Exemplos de componentes criados:

```txt
components/word/dictionary-search.tsx
components/word/recent-searches-card.tsx
components/word/word-details-card.tsx
components/word/word-loading-state.tsx
components/word/word-error-state.tsx
components/word/word-empty-state.tsx
components/word/favorites-list.tsx
components/word/favorite-word-card.tsx
components/word/favorites-empty-state.tsx
components/word/complete-dictionary.tsx
components/word/word-details-modal.tsx
components/word/alphabet-filter.tsx
```

Também foram criados componentes reutilizáveis para formulário, layout, dashboard, busca e paginação:

```txt
components/ui/form-field.tsx
components/ui/form-error.tsx
components/ui/submit-button.tsx
components/ui/search-input.tsx
components/ui/pagination-controls.tsx
components/layout/auth-page-layout.tsx
components/layout/page-header.tsx
components/dashboard/dashboard-card.tsx
```

### Acessibilidade

Foram aplicadas boas práticas de acessibilidade, incluindo:

* uso de HTML semântico;
* `aria-label` em botões de ação;
* `aria-current` na navegação ativa;
* `role="dialog"` e `aria-modal` no modal de detalhes;
* `aria-labelledby` no modal;
* fechamento do modal com tecla `Esc`;
* fechamento do modal ao clicar fora;
* foco inicial no botão de fechar ao abrir o modal;
* `aria-live` em estados de loading e erro;
* botões com estados visuais de foco.

### Performance

Foram aplicadas melhorias de performance e experiência, incluindo:

* busca com debounce;
* uso de `useMemo` para dados derivados;
* uso de `useCallback` em handlers reutilizados;
* importação dinâmica do modal de detalhes;
* separação de componentes para reduzir complexidade;
* paginação da lista de palavras;
* exibição progressiva da lista de favoritos.

### Testes

Foram adicionados testes básicos com **Vitest** e **React Testing Library**, cobrindo:

* renderização do formulário de login;
* validação de campos obrigatórios no login;
* validação de e-mail não cadastrado;
* redirecionamento após login válido;
* renderização do formulário de cadastro;
* validação de campos obrigatórios no cadastro;
* validação de senha curta;
* salvamento de usuário após cadastro válido;
* estado vazio da página de favoritos.

## Rotas da aplicação

```txt
/             Página inicial
/signup       Cadastro
/login        Login
/dashboard    Painel logado
/dictionary   Busca e dicionário completo
/favorites    Palavras favoritas
```

## Como instalar e executar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entrar na pasta do projeto

```bash
cd flora-dictionary
```

Caso o projeto esteja dentro de uma subpasta, entre na pasta onde está o `package.json`.

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

No estado atual do projeto, **não há variáveis de ambiente obrigatórias** para executar a aplicação localmente.

Mesmo assim, caso queira manter um arquivo de ambiente para evolução futura, crie:

```bash
touch .env.local
```

Exemplo de `.env.local`:

```env
# Atualmente não há variáveis obrigatórias.
# A API pública do dicionário é consumida diretamente pelo service.
```

### 5. Executar em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run start
```

Executa a versão de produção após o build.

```bash
npm run lint
```

Executa a análise de lint do projeto.

```bash
npm run test
```

Executa os testes em modo interativo.

```bash
npm run test -- --run
```

Executa os testes uma única vez.

```bash
npm run test:watch
```

Executa os testes em modo watch.

```bash
npm run test:coverage
```

Executa os testes com relatório de cobertura.

## Validação do projeto

Os comandos abaixo foram executados com sucesso durante o desenvolvimento:

```bash
npm run test -- --run
```

```bash
npm run lint
```

```bash
npm run build
```

## Fluxo para testar manualmente

1. Acesse `/signup`.
2. Crie uma conta com nome, e-mail e senha.
3. Faça login em `/login`.
4. Acesse o dashboard.
5. Entre no dicionário.
6. Pesquise uma palavra em inglês.
7. Favorite a palavra.
8. Veja a palavra na página de favoritos.
9. Volte ao dicionário e use a lista paginada.
10. Use o filtro por texto.
11. Use o filtro por letras do alfabeto.
12. Clique em uma palavra da lista para abrir o modal de detalhes.
13. Feche o modal pelo botão, pela tecla `Esc` ou clicando fora.
14. Teste o tema claro e escuro.
15. Teste o logout.

## Observações

Este projeto utiliza autenticação simulada e armazenamento local para fins de avaliação técnica front-end. Em um ambiente real, o cadastro, login, favoritos e histórico seriam persistidos em uma API/backend com banco de dados.

A estrutura atual foi pensada para facilitar essa evolução, mantendo regras de dados em `services` e `lib`, e a interface organizada em componentes reutilizáveis.
