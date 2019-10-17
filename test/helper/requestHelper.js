const request = require('supertest');
const app = require('../../app');

module.exports = {
    request: ({method, endPoint, statusCode}) => {
        return request(app)[method](endPoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(statusCode);
    }
};