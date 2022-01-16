# omni-api

Api for OMNI project

## First setup project
### Setup database
```
cd docker/db
docker build . -t omni-mssql
docker run -d -p 1433:1433 --name omni-database omni-mssql
```
### Setup project
```
yarn
yarn run knex migrate:latest
yarn run db:runSeed
yarn watch
```

After run `localhost:3000/cases` browser should return `{"data":{"type":"dip_form","attributes":{"cases":[]}}}`.

## Available commands

### `yarn start`

Runs the app

### `yarn build`

Runs app in development mode

### `yarn test`

Launches the test runner

### `yarn watch`

Run the app in the development mode

## Docker app run

In order to run application in docker container run:

```
docker build -f docker/application/DockerFile -t omni-api .
docker run -d -p 7001:7001 --name omni-api-run omni-api
```

## Database

### Initial state

The database was exported from the Omni dev environment "as it was" and captured in 2 sql scripts:

- `database_schema/Dawn_Data.sql`
- `database_schema/Dawn_v100.sql`

The database was containerized in the docker and can be run locally with 3 commands:  
- `cd docker/db`
- `docker build . -t omni-mssql`
- `docker run -d -p 1433:1433 --name omni-database omni-mssql`

### New tables

Diagrams of the database were created using online tool [dbdiagram](https://dbdiagram.io/).

For each bounded context separate folder with tables was created in folder [doc/db](doc/db).

In each folder following files were added:
- `.png` file with exported diagram from the tool
- `.sql` file with exported from the tool SQL query which create all the necessary tables and relations
- `.dbdiagram` file which contains source code used in the tool to build the diagram and link to the diagram hosted there at the top.


### Documentation
We use `apidoc` for generating API documentation. To generate docs run `npm run docs`.
Generated documentation files are served under `/docs`, e.g locally it's on `http://localhost:3000/docs`.
