const config = require('./config/config');
const app = require('express')();
const mongoose = require('mongoose');

mongoose.connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
},
    (err) => {
        if (err) console.log(err);
        else console.log('Connected to the database')
    });

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
