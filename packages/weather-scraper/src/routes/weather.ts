import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { getWeatherConfig, DEFAULT_STRING } from '../config';
import { OpenWeatherService } from '../services/weather.service';

export async function WeatherRoutes(fastify: FastifyInstance, options: any) {
    const opts: RouteShorthandOptions = { };

    fastify.get('/weather', opts, async (_, reply) => {
        const weatherService = new OpenWeatherService(getWeatherConfig());
        const weather = await weatherService.getWeather();
        reply
            .code(200)
            .send(weather);
    });
};