const { getCourses } = require('./course')
module.exports = {
    get: {
        async homePage(req, res) {
            const query = req.query;
            try {
                
                if (res.locals.isLogged) {
                    const courses = await getCourses(query);
                    return res.render('user/home', { pagetitle: "JS Back-End - Exam - November 2020", courses: courses, });
                }

                const courses = await (await getCourses({ isPublic: true, })).sort((a, b) => {
                    return b.users.length - a.users.length;
                }).slice(0,3);

                res.render('guest/home', { pagetitle: "JS Back-End - Exam - November 2020", guestcourses: courses, });

            } catch (error) {
                console.error('Error :', error);
                res.render('guest/home', { pagetitle: "JS Back-End - Exam - November 2020", errorMessage: error.message, });
            }
        },
    },
}