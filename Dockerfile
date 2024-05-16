FROM sunnyeyles/docker_exam

WORKDIR /app

COPY test.js .

CMD ["node", "app.js"]