const { check } = require('express-validator');
const Course = require('../models/Course');

const title = check('title')
    .notEmpty()
    .isLength({ min: 4, }).withMessage('Title must be of 4 characters long.')
    .custom((value, { req }) => {
        return Promise.resolve(
            Course.findOne({ title: value, }).then(user => {

                if (user) {
                    return Promise.reject('Title already in use');
                }
            }));
    });

const description = check('description')
    .notEmpty()
    .isLength({ min: 20, max: 50, }).withMessage('Description must be between 20 and 50 characters long.');

const imageUrl = check('imageUrl')
    .notEmpty()
    .isURL({ protocols: ['http', 'https',], require_protocol: true, }).withMessage('You must enter a valid URL address');

module.exports = { title, description, imageUrl, }