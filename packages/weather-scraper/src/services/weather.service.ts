import { throws } from 'assert';
import axios from 'axios';
import { DEFAULT_STRING } from 'config';

export interface IWeatherService {
    getWeather(location: string): Promise<object>;
}

export interface OpenWeatherConfig {
    cityName: string;
    apiKey: string;
}

export class OpenWeatherService implements IWeatherService {
    private readonly _config: any;

    constructor(private readonly config: OpenWeatherConfig) {
        this._config = config;
    }

    async getWeather(location?: string) {
        const cityName = location || this._config.cityName;
        const apiKey = this._config.apiKey;
    
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
}
