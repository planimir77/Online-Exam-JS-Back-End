const { getCubes } = require('./cube')
module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {
                // const cubes = await getCubes(query);
                // res.render('index', { title: "Home page", cubes: cubes, });
				res.render('index', { title: "Home page" });
            } catch (error) {
                console.error('Error :', error);
                res.render('index', { title: "Home page", errorMessage: error.message, });
            }
        },
    },
}