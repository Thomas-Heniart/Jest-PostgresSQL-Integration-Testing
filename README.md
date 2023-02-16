# Jest PostgresSQL Integration Testing

This project demonstrates a data integrity problem during the simultaneous execution of test suites and proposes a
solution to solve it.

# Installation/deployment instructions

Follow below instructions to install this project locally.

> **Requirements**:
> - NodeJS `lts/hydrogen (v.18.14.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm),
    run `nvm install && nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.
> - Docker and docker-compose for the database

## Using Yarn

- Run `yarn` to install the project dependencies.

# Test

## Problematic

Run `docker-compose up -d && yarn test-problematic`

## Solution

Run `docker-compose up -d && yarn test-solution`
