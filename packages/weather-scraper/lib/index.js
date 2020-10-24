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
const fastify_1 = __importDefault(require("fastify"));
const getPortOrDefault = (defaultPort) => {
    let port;
    const rawPort = process.env.PORT;
    if (rawPort) {
        try {
            port = parseInt(rawPort, 10);
        }
        catch (e) {
            console.error(e.message);
        }
    }
    return port || defaultPort;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        fastify: {
            enableLogger: true,
            port: getPortOrDefault(3000),
            host: process.env.HOST || '0.0.0.0',
        },
        influxdb: {
            url: '?://localhost:27017/'
        },
    };
    const server = fastify_1.default({
        logger: config.fastify.enableLogger,
    });
    // TODO
    //server.register(require('./services/influxdb.service.ts'), {
    //    url: config.influxdb.url,
    //});
    server.register(require('./routes/ping'));
    server.register(require('./routes/weather'));
    server.listen(config.fastify.port, config.fastify.host, function (err, address) {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        server.log.info(`server listening on ${address}`);
    });
});
main()
    .then(() => console.log('Done'))
    .catch((err) => console.error(JSON.stringify(err)));
