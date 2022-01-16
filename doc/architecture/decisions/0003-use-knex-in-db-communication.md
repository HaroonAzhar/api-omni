# 3. Use `knex` in DB communication

Date: 2019-12-05

## Status

Accepted

## Context

We want to use a tool that simplifies basic SQL operations and DB migrations.

In order to do so there are the following options:
- directly build SQL queries and use only the driver for communication
- use query builder (e.g. `knex` library)
- use ORM (e.g. `Sequelize`)

The main advantage of the ORM is its simplicity to start and to add new resources.

However, in most cases we observer that ORM has disadvantages:
- abstraction often leaks - we end up using some SQL at the end
- N+1 problem
- batch operations are inefficient

Query builders lie somehow between 2 extremes by simplifying a bit process of using SQL while still leaving plenty of room to do operations in an efficient way.


## Decision

Considering that:

- In the company, we have bigger experience working with query builders
- We are working with existing DB schema and DB environment thus we should be aware of all operations in the DB

We will be using `knex` in the project

## Consequences

Exporting data from DB will require creating an abstraction for the repository

We will be able to control the db operation.
