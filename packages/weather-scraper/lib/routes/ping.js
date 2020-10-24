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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
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
        fastify.get('/ping', opts, (_, reply) => {
            console.log(reply.res); // this is the http.ServerResponse with correct typings!
            reply
                .code(200)
                .send({ pong: 'it worked!' });
        });
    });
}
exports.routes = routes;
;
