FROM mongo:4.4.7

# Copy the replica initialization script
COPY replica-init.js /docker-entrypoint-initdb.d/

CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]
