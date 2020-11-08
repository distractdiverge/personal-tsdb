import { InfluxDB } from 'influx';

export type TransformOptions = {
    InfluxDbClient?: InfluxDB;
};


//
// TODO: Make Async Generator
//
export const transform = (options: TransformOptions, input: any) => {
    return {
        "temp": input.main.temp,
        "feels_like": input.main.feels_like,
        "temp_min": input.main.temp_min,
        "temp_max": input.main.temp_max,
        "pressure": input.main.pressure,
        "humidity": input.main.humidity,
        
        "visibility": input.visibility,
        
        "wind_speed": input.wind.speed,
        
        "sunrise": input.sys.sunrise,
        "sunset": input.sys.sunset,
    };
};

export const OutputNames = {
    Temp: 'temp',
    FeelsLike: 'feels_like',
    MinTemp: 'temp_min',
    MaxTemp: 'temp_max',
    Pressure: 'pressure',
    Humidity: 'humidity',
    Visibility: 'visibility',
    WindSpeed: 'wind_speed',
    SunRise: 'sunrise',
    SunSet: 'sunset',
};