const { getCourses } = require('./course')
module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {
                // const courses = await getCourses(query);
                // res.render('index', { title: "Home page", courses: courses, });
				res.render('index', { title: "Home page" });
            } catch (error) {
                console.error('Error :', error);
                res.render('index', { title: "Home page", errorMessage: error.message, });
            }
        },
    },
}