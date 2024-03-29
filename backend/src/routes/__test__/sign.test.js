import request from "supertest";
import {app} from "../../app.js";

it('returns a 201 on a successful signup', async () => {
    await request(app)
      .post('/api/sign')
      .send({
        username: 'test1234',
        password: 'password1234'
      })
      .expect(201)
  })

  it('returns a 400 with an empty password', async () => {
    await request(app)
      .post('/api/sign')
      .send({
        username: 'test1234',
        password: ''
      })
      .expect(400)
  })

  it('returns a 400 with an empty username', async () => {
    await request(app)
      .post('/api/sign')
      .send({
        username: '',
        password: 'password1234'
      })
      .expect(400)
  })

  it('returns a 400 with an duplicate username', async () => {
    await request(app)
      .post('/api/sign')
      .send({
        username: 'test1234',
        password: 'password1234'
      })
      .expect(201)

    await request(app)
      .post('/api/sign')
      .send({
        username: 'test1234',
        password: 'password1234'
      })
      .expect(400)
  })