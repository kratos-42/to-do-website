# Setup

Build API docker image from [API repository](https://github.com/kratos-42/to-do-api):

```sh
docker build -t to-do-api .
```

Run website docker compose:

```sh
docker-compose -f docker-compose.dev.yml up
```

Run the website application:

```sh
yarn start
```
