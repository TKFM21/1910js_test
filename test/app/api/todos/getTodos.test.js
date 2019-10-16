const request = require('supertest');
const assert = require('power-assert');
const app = require('../../../../app');

describe('GET /api/todosのテスト', () => {
    it('returns todos in response.body', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(200);
        
        const todos = response.body;
        assert.equal(Array.isArray(todos), true);
        todos.forEach(todo => {
            assert.equal(typeof todo.id, 'number');
            assert.equal(typeof todo.title, 'string');
            assert.equal(typeof todo.body, 'string');
            assert.equal(typeof todo.createdAt, 'string');
            assert.equal(typeof todo.updatedAt, 'string');
        });
    });
});