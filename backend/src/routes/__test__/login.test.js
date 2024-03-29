import request from 'supertest'
import { app } from '../../app.js'

it('check incorrect password/username', async () => {
  const signUp = await request(app)
    .post('/api/sign')
    .send({
      username: 'test1234',
      password: 'password1234',
    })
    .expect(201);

  const wrongPass = await request(app)
    .post('/api/login')
    .send({
      username: 'test1234',
      password: 'incorrectpassword',
    })
    .expect(401)

  const wrongName = await request(app)
    .post('/api/login')
    .send({
      username: 'test5678',
      password: 'password1234',
    })
    .expect(401)

  const correct = await request(app)
    .post('/api/login')
    .send({
      username: 'test1234',
      password: 'password1234',
    })
    .expect(200)
})

it('check wrong or empty JWT', async () => {
  const nullToken = await request(app)
    .get('/api/user')
    .set('Authorization', "")
    .expect(401);

  const wrongToken = await request(app)
    .get('/api/user')
    .set('Authorization', '444')
    .expect(403);
});