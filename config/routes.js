const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const checkAuth = require('../middlewares/check-auth');
const validateUser = require('../express-validations/user');
const validateCube = require('../express-validations/cube');
const validateAccessory = require('../express-validations/accessory');
const handleValidationErrors = require('../express-validations/handle-validation-errors');

module.exports = (app) => {
    app.get('/', homeController.get.homePage);

    app.get('/about', (req, res) => {
        res.render('about', { title: "About page", });
    });

    // ********************* Cube *********************
    // Details
    app.get('/cube/details/:id', cubeController.get.details);
    // Create
    app.get('/cube/create', checkAuth(true), cubeController.get.create);
    app.post('/cube/create',
        checkAuth(true),
        validateCube.name,
        validateCube.description,
        validateCube.imageUrl,
        handleValidationErrors,
        cubeController.post.create
    );
    // Edit
    app.get('/cube/edit/:id', checkAuth(true), cubeController.get.update);
    app.post('/cube/edit/:id',
        checkAuth(true),
        validateCube.name,
        validateCube.description,
        validateCube.imageUrl,
        handleValidationErrors,
        cubeController.post.update
    );
    // Delete
    app.get('/cube/delete/:id', checkAuth(true), cubeController.get.delete);
    app.post('/cube/delete/:id', checkAuth(true), cubeController.post.delete);
    // Attach Accessory
    app.get('/cube/attach/accessory/:id', checkAuth(true), cubeController.get.attachAccessory);
    app.post('/cube/attach/accessory/:id', checkAuth(true), cubeController.post.attachAccessory);

    /********************* Accessory *********************/
    app.get('/accessory/create', checkAuth(true), accessoryController.get.create);
    app.post('/accessory/create',
        checkAuth(true),
        validateAccessory.name,
        validateAccessory.description,
        validateAccessory.imageUrl,
        accessoryController.post.create
    );

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
