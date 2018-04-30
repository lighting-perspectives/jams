const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.title,
                filePath: req.file.path
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Todo
            .findById(req.params.id, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }

                return todo
                    .update({
                        title: req.body.title || todo.title
                    })
                    .then(() => res.status(200).send(todo))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Todo
            .findById(req.params.id)
            .then(todo => {
                if (!todo) {
                    return res.status(400).send({
                        message: 'Todo Not Found',
                    });
                }
                return todo
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Todo
            .all({
                order: [['updatedAt', 'DESC']],
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                    order: [['updatedAt', 'DESC']],
                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    findById(req, res) {
        return Todo
            .findById(req.params.id, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }]
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }

                return res.status(200).send(todo)
            })
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return Todo
            .findById(req.params.id, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }]
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }

                return res.status(200).send(todo)
            })
            .catch(error => res.status(400).send(error));
    },
};