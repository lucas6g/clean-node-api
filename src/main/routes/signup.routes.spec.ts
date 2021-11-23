
import request from 'supertest'
import { app } from '../config/app'

describe('SignUp Routes', () => {
  test('should return data', async () => {
    const response = await request(app).post('/signup').send({
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    })

    expect(response.body).toEqual({
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    })
    expect(response.status).toBe(201)
  })
})
