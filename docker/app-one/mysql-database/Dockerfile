# Use the latest MySQL 9 base image
FROM mysql:9

# Set environment variables
ENV MYSQL_DATABASE mydb

# Expose MySQL port
EXPOSE 3306

# Use health check to ensure MySQL is ready
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD mysqladmin ping -h localhost -u root -p$MYSQL_ROOT_PASSWORD || exit 1

# Copy custom scripts or configuration files from your host to the container
# In this directory, .sh, .sql, and .sql.gz scripts are executed when the container is started for the first time.
COPY ./scripts/ /docker-entrypoint-initdb.d/

# Default entrypoint (MySQL official image already has mysqld)
CMD ["mysqld"]
