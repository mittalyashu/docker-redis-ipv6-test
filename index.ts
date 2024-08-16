import { Redis } from "ioredis"

const server = Bun.serve({
    port: 8080,
    async fetch(request) {
        console.log('REDIS_PORT', process.env.REDIS_PORT);
        console.log('REDIS_HOST', process.env.REDIS_HOST);
        const redClient = new Redis({
            port: Number.parseInt(process.env.REDIS_PORT as string, 10),
            host: process.env.REDIS_HOST,
            // username: process.env.REDIS_USERNAME,
            // password: process.env.REDIS_PASSWORD,
            // enableAutoPipelining: true,
            // Force support for both IPv6 and IPv4, by default ioredis sets this to 4,
            // only allowing IPv4 connections:
            // https://github.com/redis/ioredis/issues/1576
            family: 600,
            ...(process.env.REDIS_TLS_DISABLED === "true" ? {} : { tls: {} }),
        });

        await redClient.set("hi", "hello");

        const getRes = await redClient.get('hi');
        console.log('res', getRes);

        return new Response("Welcome to Bun!");
    },
});

console.log(`Listening on localhost:${server.port}`);
