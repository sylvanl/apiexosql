# Documentation apiexosql
Welcome to our amazing API allowing you to manage transactions and operations. Note that this api is created by the Survey Corps team (War chant this way -> https://www.youtube.com/watch?v=BhipGqSZEB0).

## Table of contents
* [General information](#General)
* [Routes](#Routes)
* [Api versions](#Versions)
* [Installation](#Installation)
* [Settings](#Settings)
* [Run](#Run)

## General
Default port : 3000

## Routes

### Transactions
The `transactions` route found on `/transactions` allows you to retrieve car transactions.
It allows to choose the `columns` and/or the `id` to `GET`.

The query parameters are as follows:
```json
{
    "columns": ["list", "of columns to be requested"],
    "id": "an id from transactions table",
}
```
Where `columns` are required and `id` is optional.


#### All columns
To `GET` all `columns`, all you need is the columns parameter to contain `"all"`.

##### Example
```json
{
    "columns": ["all"]
}
```

#### Specific columns
To `GET` specific `columns`,  you can choose specific columns with the `columns` parameter.
You can choose as many columns in `columns` as needed.

##### List of possible columns
```
"id",
"merchant_account_id",
"client_name",
"client_email",
"client_billing_address",
"client_shipping_address",
"user_cart",
"amount",
"currency",
"statut",
"creation_date"
```

##### Example
```json
{
    "columns": ["id", "merchant_account_id", "client_name", "client_email"],
}
```

#### Specific transaction by id
To `GET` a specific `id`, you need to do is to add the `id` parameter with the transaction id you want to `GET`.

##### Examples
```json
{
    "columns": ["all"],
    "id": "1"
}
```

```json
{
    "columns": ["id", "merchant_account_id", "client_name", "client_email"],
    "id": "1"
}
```

Also, a `transactions-post` route found on `/transactions-post` allows you to post transactions.


### operations
The `operations` route found on `/operations` allows you to retrieve car operations from Aramaisauto.
It allows to choose the `columns` and/or the `id` to `GET`.

The query parameters are as follows:
```json
{
    "columns": ["list", "of columns to be requested"],
    "id": "an id from operations table",
}
```
Where `columns` are required and `id` is optional.


#### All columns
To `GET` all `columns`, all you need is the columns parameter to contain `"all"`.

##### Example
```json
{
    "columns": ["all"]
}
```

#### Specific columns
To `GET` specific `columns`,  you can choose specific columns with the `columns` parameter.
You can choose as many columns in `columns` as needed.

##### List of possible columns
```
"id",
"transaction_id",
"title",
"processing_url",
"creation_date"
```

##### Example
```json
{
    "columns": ["id", "transaction_id", "title", "processing_url",],
}
```

#### Specific transaction by id
To `GET` a specific `id`, you need to do is to add the `id` parameter with the transaction id you want to `GET`.

##### Examples
```json
{
    "columns": ["all"],
    "id": "1"
}
```

```json
{
    "columns": ["id", "transaction_id", "title", "processing_url",],
    "id": "1"
}
```

## Versions
--- Coming Soon ---

## Installation
This part of the documentation is for installing the api on your local machine.

### Prerequisits
Node v14.16.0 (other versions may also work but have not been tested).

### Install modules

#### Node
Install [node](https://nodejs.org/en/) modules.
```
npm install
```

#### Express
Install [express](https://expressjs.com/fr/) node framework.
```
npm i express
```

#### Knex
Install [knex](http://knexjs.org/) SQL query builder.
```
npm i knex
```

#### Joi
Install [joi](https://joi.dev/api/?v=17.4.0) data schema validation used here to validate query.
```
npm i joi
```

#### Dotenv
Install [dotenv](https://www.npmjs.com/package/dotenv) to store envoronment variables in .env.
```
npm i dotenv
```

#### Express basic auth
Install [express basic auth](https://www.npmjs.com/package/express-basic-auth) to provide basic athentification.
```
npm i express-basic-auth
```

### Settings

#### .env
Create and complete `.env` file in same folder as `.env.example` example file.
```
DATABASE_URL=databaseConnectionLink
PORT=chosenPort
```

#### api-users
Create and complete `api-users.js` file in same folder as `api-users-example.js`.
```javascript
module.exports = {
    users : { 
        username1 : "password2",
        username2 : "password2",
    }
}
```

### Run
```
npm start
```