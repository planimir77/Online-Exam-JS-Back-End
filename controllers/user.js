const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { jwtSecret, authCookieName, saltRounds, } = config;

const loginPageTitle = 'JS Back-End - Exam - November 2020';
const registerPageTitle = 'JS Back-End - Exam - November 2020';
const detailsPageTitle = 'JS Back-End - Exam - November 2020';

module.exports = {
    get: {
        login(req, res) {
            res.render('user/login', { pageTitle: loginPageTitle, });
        },
        register(req, res) {
            res.render('user/register', { pageTitle: registerPageTitle, });
        },
        details(req, res) {
            res.render('user/details/:id', { pageTitle: detailsPageTitle, });
        },
        logout(req, res) {
            res.clearCookie(authCookieName);
            res.redirect('/');
        },
    },
    post: {
        async register(req, res, next) {
            const { username, password, rePassword } = req.body;
            try {

                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);

                const user = new User({ 'username': username, 'password': hash, });
                const newUser = await user.save();

                console.log(newUser.toObject());

                if (newUser) return res.redirect('/user/login');

            } catch (error) {
                console.error('Error : ', error);
                return res.render('user/register', { errorMessage: error, });
            }
            next();
        },
        async login(req, res, next) {
            try {
                const { username, password } = req.body;

                const user = await User.findOne({ username, });
                if (user) {

                    const success = await bcrypt.compareSync(password, user.password);
                    if (success) {

                        const token = await jwt.sign({ userId: user._id, username: username, }, jwtSecret);
                        res.cookie(authCookieName, token, { httpOnly: true, });

                        return res.redirect('/');
                    }
                }
               
                return res.render('user/login', { errorMessage: 'Wrong username or password', username: username, password: password, });

            } catch (error) {
                console.error("Error: ", error);
                return res.render('user/login', { errorMessage: error, });
            }
        },
    },
}