const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../models/users/users');


describe('Auth api', () => {
    let server;

    beforeEach(() => { 
        server = require('../../index'); 
    });
    afterEach( async () => { 
        server.close();
        await User.remove({});    
    });

    afterAll( async () => {
        await mongoose.connection.close();
    });

    describe('POST /login', () => {
        it('should return 400 if email is invalid', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ email: 'test', password: 'test' });
            
            expect(res.status).toBe(401);
        }); 

        it('should return 401 if email or password are incorrect', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ email: 'test@test.com', password: '01234asdf' });

            expect(res.status).toBe(401);
        });


        it('should return 200 if email and password are correct', async () => {
            await request(server)
                .post('/api/auth/signup')
                .send({ email: 'test@test.com', name: 'testName', password:'test8778478'} );


            const res = await request(server)
                .post('/api/auth/login')
                .send({ email: 'test@test.com', password: 'test8778478' });

            expect(res.status).toBe(200);
            
            expect(res.body.token).toBeDefined();
        });
        
    }); 
    describe('POST /signup', () => {
        it('should return 400 if user details wrong', async () => {
            const res = await request(server)
                .post('/api/auth/signup')
                .send({ email: 'test@test.cp'});
            
            expect(res.status).toBe(400);
        }); 

        it('should return 201 when data is correct', async () => {
            const res = await request(server)
                .post('/api/auth/signup')
                .send({ email: 'test@test.com', name: 'testName', password:'test8778478' });
            
            expect(res.status).toBe(201);
        }); 
    
        it('should return 400 if user already exists', async () => {
            const user = new User({ email: 'test@test.com', name: '1235689' , password: '1234asdf' });
            await user.save(); 

            const res = await request(server)
                .post('/api/auth/signup')
                .send({ email: 'test@test.com', name: 'testName', password:'test8778478' });
            
            expect(res.status).toBe(400);
        }); 
    });

});