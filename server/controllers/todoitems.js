const TodoItem = require('../models').TodoItem;



module.exports = {
    findAll(req, res) {
        return TodoItem
            .all({
                order: [['updatedAt', 'DESC']],
            })
            .then(todoItems => res.status(200).send(todoItems))
            .catch(error => res.status(400).send(error));
    },

    findByTodoId(req, res) {
        return TodoItem
            .all({
                where: {todoId: req.params.id},
                order: [['updatedAt', 'DESC']],
            })
            .then(todoItems => res.status(200).send(todoItems))
            .catch(error => res.status(400).send(error));
    },

    create(req, res) {
        return TodoItem
            .create({
                content: req.body.content,
                todoId: req.params.id,
            })
            .then(todoItem => res.status(201).send(todoItem))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return TodoItem
            .find({
                where: {
                    id: req.params.id,
                    todoId: req.params.todoId,
                }
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message: 'Todo item Not Found',
                    });
                }

                return todoItem
                    .update(req.body, {fields: Object.keys(req.body)})
                    .then(todoItem => res.status(200).send(todoItem))
                    .catch(error => res.status(400).send(error));

            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return TodoItem
            .find({
                where: {
                    id: req.params.id,
                    todoId: req.params.todoId,
                },
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message: 'TodoItem Not Found',
                    });
                }

                return todoItem
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};