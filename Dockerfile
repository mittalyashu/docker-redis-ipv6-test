FROM oven/bun:1 AS dev

WORKDIR /src
COPY . .

ENV NODE_ENV=development

RUN bun install

EXPOSE 8080/tcp
ENTRYPOINT ["bun", "--hot", "run", "index.ts"]
