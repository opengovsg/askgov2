# CanAskGov Backend


## Installation

```bash
$ npm install
```

## Building for production
```bash
# This installs dev dependencies, because things like
# TypeScript and Nestjs are needed to build.
# Also generates the Prisma client (in case 
# node_modules is cached).
$ npm run build
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

