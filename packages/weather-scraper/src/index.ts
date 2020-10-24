import fastify from 'fastify'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http';

import { PingRoutes } from './routes/ping';
import { WeatherRoutes } from './routes/weather';

const getPortOrDefault = (defaultPort: number) => {
    let port;
    const rawPort = process.env.PORT;
    if (rawPort) {
        try {
            port = parseInt(rawPort, 10);       
        } catch (e) {
            console.error(e.message);
        }
    }

    return port || defaultPort;
}

const main = () => {
    const config = {
        fastify: {
            enableLogger: true,
            port: getPortOrDefault(3000),
            host: process.env.HOST || '0.0.0.0',
        },
        influxdb: {
            url: '?://localhost:27017/'
        },
    };

    const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
        logger: config.fastify.enableLogger,
    });

    // TODO
    //server.register(require('./services/influxdb.service.ts'), {
    //    url: config.influxdb.url,
    //});

    server.register(PingRoutes);
    server.register(WeatherRoutes);

    server.listen(config.fastify.port, config.fastify.host, function (err, address) {
        if (err) {
          server.log.error(err);
          process.exit(1);
        }
        server.log.info(`server listening on ${address}`);
    });
};

console.log('starting');
main();