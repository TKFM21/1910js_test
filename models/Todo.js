const todos = [];

let nextId = 0;

class Todo{
    constructor({title, body}) {
        this.id = nextId++;
        this.title = title;
        this.body = body;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

for(let i = 0; i < 5; i++) {
    const index = i;
    const title = 'title' + index;
    const body = '内容' + index;
    const todo = new Todo({
        title: title,
        body: body
    });
    todos.push(todo);
}

module.exports = {
    findAll: () => {
        return todos.slice();
    },
    create: ({title, body}) => {
        if(!title) {
            throw new Error('titleは必須です。');
        }
        if(!body) {
            throw new Error('bodyは必須です。');
        }
        const todo = new Todo({
            title: title,
            body: body
        });
        todos.push(todo);

        return todo;
    }
};