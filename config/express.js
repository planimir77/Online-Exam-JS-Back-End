const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    // Setup helpers
    var hbs = handlebars.create({
        helpers: {
            select: function (selected, options) {
                return options.fn(this).replace(
                    new RegExp(' value=\"' + selected + '\"'),
                    '$& selected="selected"');
            },
            format: function (date) {
                const shortDate = date.toString();
                return shortDate.substring(0, shortDate.indexOf('G') - 1);
            },
        },
        extname: '.hbs',
    });

    // Setup the view engine
    app.engine('hbs', hbs.engine);
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(cookieParser());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true, }));
    app.use(auth);

    // Setup the static files
    app.use('/static', express.static('static'));

    // const staticFilePath = path.join(__dirname,'..', 'static');
    // app.use('/static', express.static(staticFilePath));
};
