import { getWeatherConfig } from './config';
import { OpenWeatherService } from './services/weather.service';
import { transform, OutputNames } from './transformers/weather2influx';
import Influx from 'influx';

const makeSchemaField = (name: string) => ({
    measurement: name,
    fields: {
      path: Influx.FieldType.STRING,
      duration: Influx.FieldType.INTEGER
    },
    tags: []
  });

async function main() {
    const weatherConfig = getWeatherConfig();
    const weatherService = new OpenWeatherService(weatherConfig);

    const data = await weatherService.getWeather();
    const formattedData = transform({ }, data);
    //
    // TODO: Scrape Weather API & Insert to DB
    //
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(formattedData, null, 2));

    const schema = Object
        .values(OutputNames)
        .map(makeSchemaField);

    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'personal_tsdb',
        schema
      });
    
      
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