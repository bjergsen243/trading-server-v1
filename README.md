# Trading Backend Services

## Description

This project consists of two backend microservices that manage user accounts and transactions for a trading application. The services are designed using Node.js with the NestJS framework and leverage MongoDB for data storage and Redis for performance optimization and caching.

### Services Overview

- Account Manager Service: Handles user accounts, payment accounts (like credit, debit, loan), and payment history.

- Payment Manager Service: Manages transactions including sending and withdrawing funds, and the core transaction processing function.

### Features

- User Registration and Login
- API endpoints for sending and withdrawing funds
- API endpoints for retrieving all accounts and transactions per account
- Detailed Swagger documentation for the implemented APIs
- Authentication using JWT
- Containerized using Docker for easy deployment and scalability

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js: Version 20.x or higher is recommended.
- Yarn: Preferred package manager for installing dependencies.
- Docker: Used for containerizing the services.
- Docker Compose: For orchestrating multi-container Docker applications.
- Redis: In-memory data structure store for caching and message brokering.

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/bjergsen243/trading-server-v1.git
cd trading-server-v1
```

2. Install Dependencies:

- Use Yarn

```bash
yarn
```

Or use NPM

```bash
npm i
```

3. Environment Variables:

Create a .env file in the root directory and provide necessary environment variables. For example:

```bash
cp .env.example .env
```

4. Run Docker Compose:

```bash
docker compose -f docker-compose.yml up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
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

## TO-DO

[] Migration Database

[] Send/Verify Email

[] Cache Transaction through Redis

## License

Trading Server is [MIT licensed](LICENSE).
