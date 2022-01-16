call docker stop omni-database
call docker rm omni-database
call docker run -d -p 1433:1433 --restart unless-stopped --name omni-database omni-mssql  
TIMEOUT 10
call yarn knex migrate:latest
call yarn db:runSeed
