FROM mcr.microsoft.com/mssql/server:2019-GA-ubuntu-16.04

RUN mkdir -p /opt/mssql-scripts

COPY database_schema /opt/mssql-scripts

# set environment variables
ENV MSSQL_SA_PASSWORD=CorrectPassword0
ENV ACCEPT_EULA=Y

# run initial scripts
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P CorrectPassword0 -i /opt/mssql-scripts/Dawn_Data.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P CorrectPassword0 -i /opt/mssql-scripts/Dawn_v100.sql \
    && pkill sqlservr
