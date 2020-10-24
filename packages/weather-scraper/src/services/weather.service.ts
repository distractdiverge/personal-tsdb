import axios, { AxiosRequestConfig } from 'axios';

export const getWeather = async (lat: string, long: string) => {
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
