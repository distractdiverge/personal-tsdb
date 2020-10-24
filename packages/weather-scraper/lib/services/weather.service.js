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
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getWeather = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
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
