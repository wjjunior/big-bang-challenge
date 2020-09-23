# BigBangShop (Backend Challenge)
> ## :page_with_curl: Recursos utilizados

- Docker
- Docker Compose
- Node v12
- Typescript
- Express
- Joi
- Jest
- TDD
- DDD
- S.O.L.I.D
- Swagger

> ## :books: Requisitos

- Git
- Node
- Docker
- Docker Compose

> ## :rocket: Ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento clone o projeto, execute os comandos abaixo raiz do projeto:

```
./setup.sh
```

Selecione a opção *1* para build do projeto.

Após finalizado acesse http://localhost:5050/api-docs/ para acessar a documentação da API

> ## :white_check_mark: Testes

Para executar os testes, execute o comando abaixo na raiz do projeto:

```
npm run test
```

Para gerar os relatórios de test coverage:

```
npm run test:ci
```

> ## Considerações

Tentei seguir ao máximo os princípios do SOLID e DDD. 

O objetivo foi isolar os componentes e regras de negócio da API das dependências de infraestrutura, dessa forma ficaria fácil substituir qualquer fonte de dados e evitar a dependência do express.

Também utilizei packages de padronização de código e commits como o eslint, husky, git-commit-msg-linter, lint-staged e o swagger-ui-express para gerar a documentação funcional da API.

Optei por utilizar o package Joi para validação dos campos na request desacoplado em um validator para que possa ser facilmente substituído se necessário.


> ### Dificuldades

- Spotify API:
  Como é necessário utilizar o Client ID e Client Secret para gerar uma Bearer antes de realizar as requisições fiquei em dúvida de como gerar essa Bearer antes de cada requisição, como a API possui somente um endpoint que sempre irá necessitar dessa API adicionei o processo de autenticação do Spotify como um middleware gerando a token em cada requisição.

- Validação da Cidade e Coordenadas:
  Fiquei em dúvida de como validar a cidade e coordenadas passadas na request e optei por utilizar a validação da própria API OpenWeather e retornar um erro de BadRequest ao não retornar a temperatura.


> ## ToDo

- O teste coverage não ficou 100% e pode ser melhorado em detalhes;
- Os dados para os testes estão manuais no código, poderiam ser mocados e gerados aleatoriamente com o package faker;
- A integração com as APIs externas causam um delay nas funções da API que dependem dela, poderia ser resolvido armazenando a temperatura em cache com o Redis;

