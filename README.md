## Introdução

Este é um teste para que possamos verificar as suas habilidades como desenvolvedor de software.

Nesse teste você deverá desenvolver um aplicativo para listar palavras em inglês, utilizando como base a API [Free Dictionary API](https://dictionaryapi.dev/). O projeto a ser desenvolvido por você tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso que estão logo abaixo.

As instruções de entrega e apresentação do challenge estão no final deste Readme.

### Antes de começar

- O projeto deve utilizar como linguagem principal Node.js com banco de dados de sua preferência. Sugestão: PostgreSQL

- Aplicação de padrões de desenvolvimento, clean code e validações de chamadas são tão importantes quanto a aplicação em si e serão levados em consideração na avaliação

- Reserve ao menos um ou períodos do seu dia para realizar este teste. Caso não consiga realizar o teste e não seja possível concluir dentro de até 72 horas entre em contato através do e-mail: thaisa.ponzio@floraenergia.com.br para receber instruções sobre o que fazer.

- Procure documentar sua aplicação de forma que o avaliador não tenha dificuldade no entendimento dela.

## O Teste

### Modelo de Dados:

<details close>

Conforme indicado na documentação da API, a API retorna as informações de uma palavra, tais como etimologia, sinônimos, exemplos de uso, etc. Utilize os campos indicados na documentação dos endpoints para obter os dados necessários.

</details>

### Back-End:

<details close>

Nessa etapa você deverá construir uma API Restful com as melhores práticas de desenvolvimento.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de realizar login com usuário e senha

- Como usuário, devo ser capaz de visualizar a lista de palavras do dicionário

- Como usuário, devo ser capaz de visualizar o detalhes de uma palavra do dicionário

- Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas

- Como usuário, devo ser capaz de visualizar o histórico de palavras já visualizadas

- Como usuário, deve ser capaz de guardar uma palavra como favorita

- Como usuário, deve ser capaz de apagar uma palavra favorita

- Internamente, a API deve fazer proxy da Words API, pois assim o front irá acessar somente a sua API

**Obrigatório 2** - Você deverá desenvolver as seguintes rotas com suas requisições e respostas:

<details close>

<summary>[GET] /</summary>

<p>

Retornar a mensagem "English Dictionary"

</p>

```json
{
  "message": "English Dictionary"
}
```

</details>

<details close>

<summary>[POST] /auth/signup</summary>

```json
{
  "name": "User 1",

  "email": "example@email.com",

  "password": "test"
}
```

```json
{
  "id": "f3a106sa65dv53ab2c1380acef",

  "name": "User 1",

  "token": "Bearer JWT.Token"
}
```

</details>

<details close>

<summary>[POST] /auth/signin</summary>

```json
{
  "email": "example@email.com",

  "password": "test"
}
```

```json
{
  "id": "f3a106sa65dv53ab2c1380acef",

  "name": "User 1",

  "token": "Bearer JWT.Token"
}
```

</details>

<details close>

<summary>[GET] /entries/en</summary>

<p>

Retornar a lista de palavras do dicionário, com paginação e suporte a busca. O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:

<br/>

[GET]/entries/en?search=fire&limit=4

</p>

```json
{
  "results": ["fire", "firefly", "fireplace", "fireman"],

  "totalDocs": 20,

  "page": 1,

  "totalPages": 5,

  "hasNext": true,

  "hasPrev": false
}
```

</details>

<details close>

<summary>[GET] /entries/en/:word</summary>

<p>

Retornar as informações da palavra especificada e registrar no histórico de acesso.

</p>

</details>

<details close>

<summary>[POST] /entries/en/:word/favorite</summary>

<p>

Salva a palavra na lista de favoritas (retorno de dados no body é opcional)

</p>

</details>

<details close>

<summary>[DELETE] /entries/en/:word/unfavorite</summary>

<p>

Remover a palavra da lista de favoritas (retorno de dados no body é opcional)

</p>

</details>

<details close>

<summary>[GET] /user/me</summary>

<p>

Retornar o perfil do usúario

</p>

</details>

<details close>

<summary>[GET] /user/me/history</summary>

<p>

Retornar a lista de palavras visitadas

</p>

```json
{
  "results": [
    {
      "word": "fire",

      "added": "2024-05-05T19:28:13.531Z"
    },

    {
      "word": "firefly",

      "added": "2024-05-05T19:28:44.021Z"
    },

    {
      "word": "fireplace",

      "added": "2024-05-05T19:29:28.631Z"
    },

    {
      "word": "fireman",

      "added": "2024-05-05T19:30:03.711Z"
    }
  ],

  "totalDocs": 20,

  "page": 2,

  "totalPages": 5,

  "hasNext": true,

  "hasPrev": true
}
```

</details>

<details close>

<summary>[GET] /user/me/favorites</summary>

<p>

Retornar a lista de palavras marcadas como favoritas

</p>

```json
{
  "results": [
    {
      "word": "fire",

      "added": "2024-05-05T19:30:23.928Z"
    },

    {
      "word": "firefly",

      "added": "2024-05-05T19:30:24.088Z"
    },

    {
      "word": "fireplace",

      "added": "2024-05-05T19:30:28.963Z"
    },

    {
      "word": "fireman",

      "added": "2024-05-05T19:30:33.121Z"
    }
  ],

  "totalDocs": 20,

  "page": 2,

  "totalPages": 5,

  "hasNext": true,

  "hasPrev": true
}
```

</details>

Além disso, os endpoints devem utilizar os seguintes códigos de status:

- 200: sucesso com body ou sem body

- 204: sucesso sem body

- 400: mensagem de erro em formato humanizado, ou seja, sem informações internas e códigos de erro:

```json
{
  "message": "Error message"
}
```

**Obrigatório 3** - Você deve criar um script para baixar a lista de palavras do repositório e importar estas palavras para o banco de dados. A API não possui endpoint com a lista de palavras. Para criar seu endpoint será necessário alimentar o seu banco de dados com o [arquivo existente dentro do projeto no Github](https://github.com/dwyl/english-words/blob/master/words_dictionary.json).

**Obrigatório 4** - Salvar em cache o resultado das requisições a API, para agilizar a resposta em caso de buscas com parâmetros repetidos. Sugestões são usar o Redis e/ou MongoDB;

O cache pode ser feito para guardar todo o corpo das respostas ou para guardar o resultado das queries do banco. Para identificar a presença de cache, será necessário adicionar os seguintes headers nas respostas:

- x-cache: valores HIT (retornou dados em cache) ou MISS (precisou buscar no banco)

- x-response-time: duração da requisição em milissegundos

**Diferenciais:**

- **Descrever a documentação da API** utilizando o conceito de close API 3.0;

- **Escrever Unit Tests** para os endpoints da API;

- **Configurar Docker no Projeto** para facilitar o Deploy da equipe de DevOps;

- **Deploy em algum servidor**, com ou sem automatização do CI.

- **Implementar paginação com cursores** ao inves de usar page e limit . Ao realizar este diferencial, o retorno dos endpoints deve possuir a seguinte estrutura:

```json
{
  "results": ["fire", "firefly", "fireplace", "fireman"],

  "totalDocs": 20,

  "previous": "eyIkb2lkIjoiNTgwZmQxNmjJkOGI5In0",

  "next": "eyIkb2lkIjoiNTgwZmQxNm1NjJkOGI4In0",

  "hasNext": true,

  "hasPrev": true
}
```

</details>

### Front-End:

<details close>

**Objetivo:** Construir uma aplicação Next.js v15 com App Router para consulta e gerenciamento de palavras de um dicionário, utilizando o backend previamente criado.

**Funcionalidades:**

1. **Tela de Cadastro**

   - Permite que o usuário se cadastre na aplicação.

1. **Tela de Login**

   - Permite que o usuário faça login na a aplicação usando email e senha.

1. **Tela Inicial**
   - **Campo de Pesquisa:** Permite ao usuário buscar uma nova palavra.
   - **Histórico de Pesquisas:** Lista as palavras recentemente pesquisadas.
     - Ao clicar em uma palavra do histórico, abre uma página com detalhes da palavra.
1. **Página de Detalhes da Palavra**

   - Exibe as informações detalhadas da palavra pesquisada.
   - Opção de **favoritar** ou **desfavoritar** a palavra.

1. **Lista de Palavras Favoritas**

   - Exibe todas as palavras marcadas como favoritas.
   - Permite **desfavoritar** uma palavra diretamente na lista.
   - Ao clicar em uma palavra favorita, abre a página de detalhes.

1. **Lista Completa do Dicionário**

   - Mostra uma lista de todas as palavras disponíveis no dicionário.
   - Ao clicar em uma palavra, abrir um modal com os detalhes.

1. **Logout**
   - Opção para que o usuário saia da aplicação.

**Requisitos Técnicos:**

- A aplicação deve ser desenvolvida em **Next.js v15** utilizando o **App Router**.
- Conectar-se ao backend previamente desenvolvido para realizar as operações de busca e autenticação.

**Diferenciais:**

- **Interface amigável e intuitiva** para melhor experiência do usuário.
- **Deploy em um servidor público** (como Vercel, Netlify, ou AWS).
- **Configuração Docker** para facilitar o deploy e integração com a equipe de DevOps.

</details>

## Armazene tudo no GitHub

- Faça o push do projeto em um repositório público no GitHub

- Não se esqueça de revisar se todos os arquivos subiram

## Readme do Repositório

- Deve conter o título do projeto

- Uma descrição sucinta sobre o projeto

- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas

- Como instalar e usar o projeto (instruções)

- Não esqueça o [.gitignore]

## Finalização

1. Adicione o link do repositório com a sua solução no teste

2. Envie e aguarde nosso retorno. Boa sorte!
