# Delivery App Back

API for a food delivery app built with node.js

## Connected Projects
- Web: https://github.com/moiseshilario/delivery-app-web
- Mobile: https://github.com/moiseshilario/delivery-app-mobile

## Setup

```bash
yarn
```

or

```bash
npm i
```

### Migrations

Run the migrations to create the database, tables and columns

```
npx sequelize db:migrate
```

To **undo** the migrations:

```
npx sequelize db:migrate:undo:all
```

### Seeds

Run the seeds to populate data on database

```
npx sequelize db:seed:all
```

To **undo** the seeds:

```
npx sequelize db:seed:undo:all
```

---
## Running

```
yarn start
```

or


```
npm run start
```
---

## API Routes

Please import `Delivery-App-Insomnia.json` into Insomnia App to check out/use api routes/payloads

## Database Diagram

Check out the database diagram, with its schema and its relations on https://app.quickdatabasediagrams.com/#/d/xk3MBE

## Stack

- Database: Postgres
- ORM: Sequelize
- Authentication: jwt
- Encrypt: bcryptjs
