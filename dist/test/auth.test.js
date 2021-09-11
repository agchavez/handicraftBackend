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
const supertest_1 = __importDefault(require("supertest"));
const serverModel_1 = __importDefault(require("../src/models/serverModel"));
const userModel_1 = __importDefault(require("../src/models/userModel"));
const server = new serverModel_1.default();
describe('Testing user-auth', () => {
    const app = (0, supertest_1.default)(server.app);
    test('Create new user ', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.deleteMany({});
        yield app.post('/api/user/post')
            .send({
            email: "agchavez@unah.hn",
            firtName: "Angel Gabriel",
            lastName: "Chavez Vigil",
            password: "agchavez",
            phone: 31998850
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    }));
});
//# sourceMappingURL=auth.test.js.map