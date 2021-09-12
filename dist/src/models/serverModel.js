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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
class Server {
    constructor() {
        this.apiPath = {
            auth: "/api/auth",
            user: "/api/user",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, dbConfig_1.default)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        //Rutas publicas
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use(this.apiPath.auth, auth_routes_1.default);
        this.app.use(this.apiPath.user, user_routes_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=serverModel.js.map