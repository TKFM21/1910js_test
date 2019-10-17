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

const VALID_ID = 6;
const INVALID_ID = 9999999;

describe('DELETE /api/todos/id', () => {
    it('idに不正な値が入力された場合エラー', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: '/api/todos/ui',
            statusCode: 400
        });
        assert.deepEqual(response.body, {message: '該当するidはありません。'});
    });

    it('存在しないidが入力された場合エラー', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/todos/${INVALID_ID}`,
            statusCode: 400
        });
        assert.deepEqual(response.body, {message: '該当するidはありません。'});
    });

    it('正常系のテスト。削除できて、リストも1件減っていることをテスト', async () => {
        const oldTodos = await getTodos();

        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/todos/${VALID_ID}`,
            statusCode: 200
        });
        const removeTodo = response.body;
        assert.deepEqual(removeTodo, {
            id: VALID_ID,
            title: removeTodo.title,
            body: removeTodo.body,
            createdAt: removeTodo.createdAt,
            updatedAt: removeTodo.updatedAt
        });

        const currentTodos = await getTodos();
        assert.equal(oldTodos.length - 1, currentTodos.length);
        assert.deepEqual(removeTodo, oldTodos[5]);
        assert.notDeepEqual(removeTodo, currentTodos[-1]);
    });
});