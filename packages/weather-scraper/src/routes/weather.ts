import { FastifyInstance, RouteShorthandOptions } from 'fastify';

export async function WeatherRoutes(fastify: FastifyInstance, options: any) {
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

    fastify.get('/weather', opts, (_, reply) => {
        console.log((<any>reply).res); // this is the http.ServerResponse with correct typings!
        reply
            .code(200)
            .send({
                temp: 'still nice out'
            });
    });
};