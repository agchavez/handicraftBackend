import supertest from 'supertest';

import Server from '../src/models/serverModel';
import User from '../src/models/userModel';

const server = new Server();

describe('Testing user-auth', () => {
    const app = supertest(server.app);

    test('Create new user ', async () => {
        await User.deleteMany({});
        await app.post('/api/user/post')
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
    
    
})



