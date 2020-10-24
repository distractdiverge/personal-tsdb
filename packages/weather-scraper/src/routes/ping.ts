import { FastifyInstance, RouteShorthandOptions } from 'fastify';

export async function PingRoutes(fastify: FastifyInstance, options: any) {
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

    fastify.get('/ping', opts, (_, reply) => {
        console.log((<any>reply).res); // this is the http.ServerResponse with correct typings!
        reply
            .code(200)
            .send({ pong: 'it worked!' });
    });
};