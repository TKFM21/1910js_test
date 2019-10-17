const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('removeメソッドのテスト', () => {
    it('removeメソッドの存在確認', () => {
        assert.equal(typeof Todo.remove, 'function');
    });

    it('idに不正な値が渡されたらエラー', () => {
        const invalidIds = [-1, , null, '1', undefined];
        invalidIds.forEach(invalid => {
            try {
                const removeTodo = Todo.remove(invalid);
                assert.fail();
            } catch (error) {
                assert.equal(error.message, 'idは必須です。（1以上の数値）');
            }
        });
    });

    it('存在しないid値を渡された場合エラー', () => {
        try {
            const removeTodo = Todo.remove(9999999);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, '該当するidはありません。');
        }
    });

    it('正常処理系のテスト', () => {
        const oldTodos = Todo.findAll();
        const removeTodo = Todo.remove(2);
        assert.deepEqual(removeTodo, {
            id: 2,
            title: removeTodo.title,
            body: removeTodo.body,
            createdAt: removeTodo.createdAt,
            updatedAt: removeTodo.updatedAt
        });

        const currentTodos = Todo.findAll();
        assert.equal(oldTodos.length, currentTodos.length + 1);
    });
});