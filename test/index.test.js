import app from '../src/app'
import request from 'supertest'

describe('GET /task', () => {
    test('should respond with 200 status code', async() => {
        const response = await request(app).get('/task').send()
        expect(response.statusCode).toBe(200)
    });

    test('should respond with an array', async() => {
        const response = await request(app).get('/task').send()
        expect(response.body).toBeInstanceOf(Array)
    })
});

describe('POST /tasks', () => {
    describe('given a title and description',  () => {

        const newTask = {
            title: "test task",
            description: "test description"
        }

        test('should respond with 200 status code', async() => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.statusCode).toBe(200)
        });
    
        test('should be an object', async() => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining("json"))
        })
    
        test('id must exist', async() => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        })
    })

    describe('when title is missing or description is missing', () => {
        test('should respond with a 400 status code', async() => {
            const fields = [
                {},
                {title: 'test'},
                {description: 'descp'},
            ]
            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body)
                expect(response.statusCode).toBe(400)
            }
        })
    })
});