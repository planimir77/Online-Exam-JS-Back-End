const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const courseController = require('../controllers/course');
const checkAuth = require('../middlewares/check-auth');
const validateUser = require('../express-validations/user');
const validateCourse = require('../express-validations/course');
const handleValidationErrors = require('../express-validations/handle-validation-errors');

module.exports = (app) => {
    app.get('/', homeController.get.homePage);

    app.get('/about', (req, res) => {
        res.render('about', { title: "About page", });
    });

    // ********************* Course *********************
    // Details
    app.get('/course/details/:id', courseController.get.details);
    // Create
    app.get('/course/create', checkAuth(true), courseController.get.create);
    app.post('/course/create',
        checkAuth(true),
        validateCourse.title,
        validateCourse.description,
        validateCourse.imageUrl,
        handleValidationErrors,
        courseController.post.create
    );
    // Edit
    app.get('/course/edit/:id', checkAuth(true), courseController.get.update);
    app.post('/course/edit/:id',
        checkAuth(true),
        validateCourse.title,
        validateCourse.description,
        validateCourse.imageUrl,
        handleValidationErrors,
        courseController.post.update
    );
    // Delete
    app.get('/course/delete/:id', checkAuth(true), courseController.get.delete);
    app.post('/course/delete/:id', checkAuth(true), courseController.post.delete);

    /********************* User *********************/
    // Register
    app.get('/user/register', checkAuth(false), userController.get.register);
    app.post('/user/register',
        checkAuth(false),
        validateUser.username,
        validateUser.password,
        handleValidationErrors,
        userController.post.register
    );
    // Login
    app.get('/user/login', checkAuth(false), userController.get.login);
    app.post('/user/login', checkAuth(false), userController.post.login);

    // Logout
    app.get('/logout', checkAuth(true), userController.get.logout);

    /****************** Not found *********************/
    app.get('*', (req, res) => {
        res.render('404', { title: "Not found", });
    });
};
