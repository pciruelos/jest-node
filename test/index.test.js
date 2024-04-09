import app from '../src/app'
import request from 'supertest'

describe('GET /task', () => {
    test('should respond with 200 status code', async() => {
        const response = await request(app).get('/task').send()
        expect(response.statusCode).toBe(200)
    })
})