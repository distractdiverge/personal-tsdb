import axios, { AxiosRequestConfig } from 'axios';
import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http';

const getWeather = async (lat: string, long: string) => {
    var options: AxiosRequestConfig = {
        method: 'get',
        url: 'https://rapidapi.p.rapidapi.com/weather/nowcast',
        params: {lat, lon: long, fields: 'precipitation'},
        headers: {
            'x-rapidapi-host': 'climacell-microweather-v1.p.rapidapi.com',
            'x-rapidapi-key': 'SIGN-UP-FOR-KEY'
        }
    };

    return axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error);
            throw error;
        });
}

const main = async () => {
    const data = await getWeather('42.8237618', '-71.2216286');
    console.log(JSON.stringify(data));

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


};

main()
    .then(() => console.log('Done'))
    .catch((err) => console.error(JSON.stringify(err)));
