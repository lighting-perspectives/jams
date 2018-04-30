const Sample = require('../models').Sample;

const uuidv4 = require('uuid/v4');

module.exports = {
    create(req, res) {
        return Sample
            .create({
                id: uuidv4(),
                path: req.file.path,
                filename: req.file.filename,
                container: 'mp4'
            })
            .then(sample => res.status(201).send(sample))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Sample
            .findById(req.params.id, {})
            .then(sample => {
                if (!sample) {
                    return res.status(404).send({
                        message: `Failed to retrieve sample n°${req.params.id}`,
                    });
                }

                return sample
                    .update({
                        path: req.file.path || sample.path,
                        filename: req.file.filename || sample.filename,
                    })
                    .then(() => res.status(200).send(sample))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Sample
            .findById(req.params.id)
            .then(sample => {
                if (!sample) {
                    return res.status(400).send({
                        message: `Failed to retrieve sample n°${req.params.id}`,
                    });
                }
                return sample
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    findById(req, res) {
        return Sample
            .findById(req.params.id, {})
            .then(sample => {
                if (!sample) {
                    return res.status(404).send({
                        message: `Failed to retrieve sample n°${req.params.id}`,
                    });
                }

                return res.status(200).send(sample)
            })
            .catch(error => res.status(400).send(error));
    },

    findAll(req, res) {
        return Sample
            .all({
                order: [['updatedAt', 'DESC']],
            })
            .then(samples => res.status(200).send(samples))
            .catch(error => res.status(400).send(error));
    },

};