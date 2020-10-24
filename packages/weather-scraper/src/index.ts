import fastify from 'fastify'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http';

const main = async () => {
    const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

    const opts: RouteShorthandOptions = {
        schema: {
            response: {
            200: {
                type: 'object',
                properties: {
                pong: {
                    type: 'string'
                }
                }
            }
            }
        }
    };

    server.get('/ping', opts, (_, reply) => {
        console.log((<any>reply).res); // this is the http.ServerResponse with correct typings!
        reply.code(200).send({ pong: 'it worked!' });
    });

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';
    server.listen(port, host, function (err, address) {
        if (err) {
          server.log.error(err)
          process.exit(1)
        }
        server.log.info(`server listening on ${address}`)
    })
};

main()
    .then(() => console.log('Done'))
    .catch((err) => console.error(JSON.stringify(err)));
