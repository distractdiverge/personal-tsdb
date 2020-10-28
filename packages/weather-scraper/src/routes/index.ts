import { FastifyInstance, RouteShorthandOptions } from 'fastify';

export async function IndexRoute(fastify: FastifyInstance, options: any) {
    const opts: RouteShorthandOptions = {
        
    };

    // @ts-ignore
    fastify.get('/', opts, (_, reply) => ({
        ['/ping']: { method: 'GET' },
        ['/weather']: { method: 'GET' },
        ['/metrics']: { method: 'GET' },
    }));
};