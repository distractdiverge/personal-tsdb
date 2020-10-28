import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import axios from 'axios';
import getConfig, { DEFAULT_STRING } from '../config';

export async function getWeatherOpenWeatherAPI() {
    const config = getConfig();
    const cityName = config.weather.cityName;
    const apiKey = config.weather.apiKey;

    if (apiKey === DEFAULT_STRING) {
        throw new Error('Missing APIKey for Weather');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    let response;
    
    try {
        console.log('Getting: ' + url);
        response = await axios.get(url);
    } catch (error) {
        console.log('Error: ' + error.message)
        throw error;
    }

    if (!response || response.status !== 200) {
        throw new Error(`Unexpected Response Code: ${response.status}: '${response.statusText}'`);
    }

    return response.data;
}

export async function WeatherRoutes(fastify: FastifyInstance, options: any) {
    const opts: RouteShorthandOptions = {
        /*schema: {
            response: {
            200: {
                type: 'object',
                properties: {
                    
                }
                }
            }
        }*/
    };

    fastify.get('/weather', opts, async (_, reply) => {
        // console.log((<any>reply).res); // this is the http.ServerResponse with correct typings!
        const weather = await getWeatherOpenWeatherAPI();
        reply
            .code(200)
            .send(weather);
    });
};