const assert = require('power-assert');
const todo = require('../../../models/Todo');

describe('findAllメソッドのテスト', () => {
    it('findAllメソッドの存在確認', () => {
        assert.equal(typeof todo.findAll, 'function');
    });

    it('各プロパティのテスト', () => {
        const todos = todo.findAll();
        assert.equal(Array.isArray(todos), true);
        assert.equal(todos.length > 0, true);
        todos.forEach(todo => {
            assert.deepStrictEqual({ ...todo }, {
                id: todo.id,
                title: todo.title,
                body: todo.body,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt
            });
        });
    });
});