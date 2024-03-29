import request from 'supertest';
import {app} from '../../app.js';

it('check JWT get current user info', async () => {
  const signUp = await request(app)
    .post('/api/sign')
    .send({
      username: 'test1234',
      password: 'password1234',
    })
    .expect(201);
  
  const login = await request(app)
    .post('/api/login')
    .send({
      username: 'test1234',
      password: 'password1234',
    })
    .expect(200);
  
  var token = login.body.token;
  token = token.split('=')[1];
  
  const response = await request(app)
    .get('/api/user')
    .set('Authorization', token)
    .expect(200);
  
  expect(response.body.users[0].username).toEqual('test1234');
});