const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbConnectionString: process.env.SoftuniDb,//,'mongodb://127.0.0.1:27017/exam-database'
        authCookieName: 'auth_cookie',
        authHeaderName: 'auth',
        jwtSecret: 'secret',
        saltRounds: 10,
    },
    production: {},
};
module.exports = config[env];
