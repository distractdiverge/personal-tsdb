import * as dotenv from 'dotenv';

dotenv.config();

const getIntOrDefault = (envName: string, defaultValue: number) => {
    let value;
    const rawValue = process.env[envName];
    if (rawValue) {
        try {
            value = parseInt(rawValue, 10);       
        } catch (e) {
            console.error(e.message);
        }
    }

    return value || defaultValue;
};

const getStringOrDefault = (envName: string, defaultValue: string) => {
    const rawValue = process.env[envName];
    return rawValue || defaultValue;
};

export const DEFAULT_STRING = '<UNSET>';

export default function() {
    return {
        fastify: {
            enableLogger: true,
            port: getIntOrDefault('PORT', 3000),
            host: getStringOrDefault('HOST', '0.0.0.0'),
        },
        weather: {
            cityName: '18976',
            apiKey: getStringOrDefault('OPEN_WEATHER_API_KEY', DEFAULT_STRING),
        },
        influxdb: {
            url: '?://localhost:27017/'
        },
    };
}