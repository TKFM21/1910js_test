const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('Todo.update', () => {
    it('Todo.updateはメソッドであること', () => {
        assert.equal(typeof Todo.update, 'function');
    });

    it('メソッド実行時、引数にidプロパティ値（1以上の数値）を含むオブジェクトでないとエラーになる', () => {
        const invalidDataList = [
            {},
            {id: 0},
            {id: -1},
            {id: null},
            {id: {}},
            {id: []},
            {id: '1'}
        ];

        invalidDataList.forEach(data => {
            try {
                Todo.update(data);
                assert.fail();
            } catch (error) {
                assert.equal(error.message, 'idは必須です。（1以上の数値）');
            }
        });
    });

    it('メソッド実行時、引数にtitleプロパティを含むオブジェクトがないとエラーになる', () => {
        try {
            Todo.update({id: 1, body: 'body'});
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'titleは必須です。');
        }
    });

    it('メソッド実行時、引数にbodyプロパティを含むオブジェクトがないとエラーになる', () => {
        try {
            Todo.update({id: 1, title: 'title'});
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'bodyは必須です。');
        }
    });

    it('メソッド実行時、存在しないidが指定された場合エラーになる', () => {
        const noExistedId = 9999999;
        try {
            Todo.update({
                id: noExistedId,
                title: 'title',
                body: 'body'
            });
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'idに該当するtodoが存在しません。');
        }
    });

    it('メソッド実行時、正しい引数を渡すとidに該当する既存Todoを更新して、更新したTodoを返す', () => {
        const data = {
            id: 1,
            title: 'Update title',
            body: 'Update body'
        };

        const updatedTodo = Todo.update(data);
        assert.deepEqual(updatedTodo, {
            id: updatedTodo.id,
            title: data.title,
            body: data.body,
            createdAt: updatedTodo.createdAt,
            updatedAt: updatedTodo.updatedAt
        });

        const currentTodos = Todo.findAll();
        assert.deepEqual(currentTodos[0], updatedTodo);
        assert.equal(updatedTodo.updatedAt > updatedTodo.createdAt, true);
    });
});