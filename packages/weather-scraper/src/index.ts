import fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import Metrics from 'fastify-metrics';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { IndexRoute } from './routes';
import { PingRoutes } from './routes/ping';
import { WeatherRoutes } from './routes/weather';
import { getFastifyConfig } from './config';

const main = () => {
    const config = getFastifyConfig();

    const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
        logger: config.enableLogger,
    });

    // TODO
    //server.register(require('./services/influxdb.service.ts'), {
    //    url: config.influxdb.url,
    //});

    server.register(Metrics, { endpoint: '/metrics'});
    server.register(PingRoutes);
    server.register(WeatherRoutes);
    server.register(IndexRoute);

    server.log.info(`server listening on ${config.host}`);
    server.listen(config.port, config.host, function (err, address) {
        if (err) {
          server.log.error(err);
          process.exit(1);
        }
        server.log.info(`server listening on ${address}`);
    });
};

console.log('starting');
main();