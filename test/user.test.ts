import supertest from 'supertest';

import Server from '../src/models/server.model';
import User from '../src/models/user.model';

const server = new Server();
var token:string;

describe('User information', () => {
    const app = supertest(server.app);

    test('Login user', (done) => {
        app.get('/api/auth/login')
                .send({
                   email    :"agchavez@unah.hn",
                   password :"agchavez",
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                   token = res.body.token;
                   done(); // Or something
                 })
   });
   
    test('Get all user ', async() => {
        const commonHeaders = { token, 'limit':10 };
        await app.get('/api/user/all')
        .set(commonHeaders)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)   
    });
})


