const { check } = require('express-validator');
const User = require('../models/User');

const username = check('username')
    .notEmpty()
    .isLength({ min: 5, }).withMessage('Username must be of 5 characters long.')
    .matches(/^[A-Za-z0-9]*$/).withMessage('Username should consist only with English letters and digits')
    .custom((value, { req }) => {
        return Promise.resolve(
            User.findOne({ username: value, }).then(user => {

                if (user) {
                    return Promise.reject('Username already in use');
                }
            }));
    });

const password = check('password')
    .notEmpty()
    .isLength({ min: 8, }).withMessage('Password must be of 8 characters long.')
    .matches(/^[A-Za-z0-9]*$/).withMessage('Username should consist only with English letters and digits')
    .custom((value, { req }) => {

        if (value !== req.body.repeatPassword) {
            return Promise.reject('Password confirmation is incorrect');
        } else {
            return true;
        }
    });

module.exports = { username, password, };