"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fastify_1 = __importDefault(require("fastify"));
const getWeather = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    var options = {
        method: 'get',
        url: 'https://rapidapi.p.rapidapi.com/weather/nowcast',
        params: { lat, lon: long, fields: 'precipitation' },
        headers: {
            'x-rapidapi-host': 'climacell-microweather-v1.p.rapidapi.com',
            'x-rapidapi-key': 'SIGN-UP-FOR-KEY'
        }
    };
    return axios_1.default
        .request(options)
        .then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getWeather('42.8237618', '-71.2216286');
    console.log(JSON.stringify(data));
    const server = fastify_1.default({});
    const opts = {
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
        console.log(reply.res); // this is the http.ServerResponse with correct typings!
        reply.code(200).send({ pong: 'it worked!' });
    });
});
main()
    .then(() => console.log('Done'))
    .catch((err) => console.error(JSON.stringify(err)));
