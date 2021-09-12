import supertest from 'supertest';

import Server from '../src/models/server.model';
import User from '../src/models/user.model';

const server = new Server();
var token:string;
describe('Testing user-auth', () => {
    const app = supertest(server.app);

    test('Create new user ', async () => {
        await User.deleteMany({});
        await app.post('/api/user/new')
            .send({
                email    :"agchavez@unah.hn",
                firtName :"Angel Gabriel",
                lastName :"Chavez Vigil",
                password :"agchavez",
                phone    :31998850
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

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
    test('Login user fail', async() => {
       await app.get('/api/auth/login')
                .send({
                   email    :"agchavez@unah.hn",
                   password :"aq223fq",
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);
                
   });
});

describe('User information', () => {
    const app = supertest(server.app);
    test('Get all user ', async() => {
        const commonHeaders = { token, 'limit':10 };
        await app.get('/api/user/all')
        .set(commonHeaders)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)   
    });
})




