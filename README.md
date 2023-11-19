# Raven Mobile Api

This project is the manager of all requests, security, and processing all data from Raven Social Network.

## Technologies

- NodeJS
- Typescript
- Prisma ORM
- PostgreSQL

## Installation

You need to install in your machine:

- NodeJS
- PostgreSQL

It is useful to have Git as well

In your terminal use the following commands:

- Clone the repository in your machine using Git:

```sh
git clone https://github.com/EnzoWM02/raven_mobile_api.git
```

- Enter the project directory (default name);

```
cd raven_mobile_api/
```

- Install the required dependencies:

```
npm install
```

- Create in your postgreSQL a local database called raven_mobile
- Remove the .example from the .env file in your project root folder, you can change some configurations there
- Run the initial migrating resource of Prisma:

```
npx prisma migrate dev
```

- Run the project using

```
npm run dev
```
