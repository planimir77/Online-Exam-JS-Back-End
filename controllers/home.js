const { getCourses } = require('./course')
const homePageTitle = "JS Back-End - Exam - November 2020";

module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {

                if (res.locals.isLogged) {
                    // all public courses sorted by the created time in ascending order
                    const courses = await (await getCourses({ isPublic: true, ...query, }, { createdAt: 1, },));

                    return res.render('user/home', { pageTitle: homePageTitle, courses: courses, });
                }

                // 3 public courses sorted by the count of enrolled in users in descending order
                const courses = await (await getCourses({ isPublic: true, }, { users: -1, }, 3));

                res.render('guest/home', { pageTitle: homePageTitle, topcourses: courses, });

            } catch (error) {
                console.error('Error :', error);
                res.render('guest/home', { pageTitle: homePageTitle, errorMessage: error.message, });
            }
        },
    },
}