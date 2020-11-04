import { getWeatherConfig } from './config';
import { OpenWeatherService } from './services/weather.service';

async function main() {
    const weatherConfig = getWeatherConfig();
    const weatherService = new OpenWeatherService(weatherConfig);

    const data = await weatherService.getWeather();
    //
    // TODO: Scrape Weather API & Insert to DB
    //
    console.log(JSON.stringify(data, null, 2));
}

main()
    .then(() => {
        console.log('DONE');
        process.exit(0);
    })
    .catch((error) => {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    });