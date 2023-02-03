## Descrição

Construido usando [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Importante

Para rodar o banco de dados, basta ter o docker e o docker-compose instalado e utilizad o comando:

```bash
$ docker-compose -f Docker/docker-compose.yml up -d
```

Após isso preencher o .env com a URL de conexão com o banco levantado
