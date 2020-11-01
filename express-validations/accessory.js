const { check } = require('express-validator');

const name = check('name')
    .notEmpty()
    .isLength({ min: 5, }).withMessage('Name must be of 5 characters long.')
    .matches(/^[A-Za-z0-9\s]*$/).withMessage('Name should consist only with English letters, digits and whitespaces');

const description = check('description')
    .notEmpty()
    .isLength({ min: 20, }).withMessage('Description must be of 5 characters long.')
    .matches(/^[A-Za-z0-9\s]*$/).withMessage('Description should consist only with English letters, digits and whitespaces');

const imageUrl = check('imageUrl')
    .notEmpty()
    .isURL({ protocols: ['http', 'https',], require_protocol: true, }).withMessage('You must enter a valid URL address');

module.exports = { name, description, imageUrl, }