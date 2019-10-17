const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

const getTodos = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/todos',
        statusCode: 200
    });
    return response.body;
};

describe('test [POST /api/todos]', () => {
    it('titleがないと400エラーが返る', async () => {
        const postData = {body: 'test body'};

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/todos',
            statusCode: 400
        }).send(postData);

        assert.deepEqual(response.body, {
            message: 'titleは必須です。'
        });
    });

    it('bodyがないと400エラーが返る', async () => {
        const postData = {title: 'test title'};

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/todos',
            statusCode: 400
        }).send(postData);

        assert.deepEqual(response.body, {
            message: 'bodyは必須です。'
        });
    });

    it('title, bodyを送れば成功', async () => {
        const oldTodos = await getTodos();

        const postData = {
            title: 'test title',
            body: 'test body'
        };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/todos',
            statusCode: 200
        }).send(postData);

        const createdTodo = response.body;
        assert.deepEqual(createdTodo, {
            id: createdTodo.id,
            title: postData.title,
            body: postData.body,
            createdAt: createdTodo.createdAt,
            updatedAt: createdTodo.updatedAt
        });

        const currentTodos = await getTodos();
        assert.equal(oldTodos.length + 1, currentTodos.length);
    });
});