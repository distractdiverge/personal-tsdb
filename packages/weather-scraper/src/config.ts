import convict from 'convict';
import * as dotenv from 'dotenv';

dotenv.config();
export const DEFAULT_STRING = '<UNSET>';

const config = convict({
    fastify: {
        enableLogger: {
            default: true,
        },
        port: {
            env: 'PORT',
            default: 3000,
        },
        host: {
            env: 'HOST',
            default: '0.0.0.0',
        },
    },
    weather: {
        cityName: {
            default: '18976',
        },
        apiKey: {
            env: 'OPEN_WEATHER_API_KEY',
            default: DEFAULT_STRING,
        }
    },
    influxdb: {
        url: '?://localhost:27017/'
    }
});

config.validate();

export const getFastifyConfig = () => config.get('fastify');
export const getWeatherConfig = () => config.get('weather');
export const getInfluxDBConfig = () => config.get('influxdb');

export default {
    getWeatherConfig,
    getFastifyConfig,
    getInfluxDBConfig,
};
