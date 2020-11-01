const Course = require('../models/Course');
const User = require('../models/User');

const getCourse = async (id) => {
    const course = await Course.findOne({ _id: id, }).lean();
    console.log(course);

    return course;
};

const getCourses = async (query) => {

    const courses = await Course.find(query).lean();
    console.log("Courses: ", courses);

    return courses;
};

const getUsersEnrolledCourse = async (courseId) => {

    return User.find({ courses: { $in: courseId, }, }).lean();
}

module.exports = {
    get: {
        async details(req, res) {
            const courseId = req.params.id;
            try {
                const currentUser = req.user._id;
                const course = await getCourse(courseId);

                // Find array of users in course with courseId
                const users = await getUsersEnrolledCourse(courseId);

                const isEnrolled = Boolean(users.some(user => user._id.toString() === currentUser));

                res.render('course/details', {
                    pagetitle: "JS Back-End - Exam - November 2020",
                    ...course,
                    isEnrolled: isEnrolled,
                });

            } catch (error) {
                console.error('Error :', error);
                res.render('/', { errorMessage: error.message, });
            }
        },
        create(req, res) {
            res.render('course/create', { pagetitle: "JS Back-End - Exam - November 2020", });
        },
        async update(req, res) {
            const courseId = req.params.id;
            try {
                const course = await getCourse(courseId);
                res.render('course/edit', { pagetitle: "JS Back-End - Exam - November 2020", ...course, });

            } catch (error) {
                console.error('Error :', error);
                res.render('course/edit', { errorMessage: error.message, });
            }
        },
        async enroll(req, res) {
            try {
                const courseId = req.params.id;
                const userId = req.user._id;

                await Course.updateOne({ _id: courseId, }, {
                    $push: { users: userId, },
                });
                await User.updateOne({ _id: userId, }, {
                    $push: { courses: courseId, },
                });

                res.redirect(`/course/details/${courseId}`);

            } catch (error) {
                console.error('Error: ' + error);
                req.render(`/course/details/${courseId}`, { errorMessage: error.message, })
            }
        },
        async delete(req, res) {
            const courseId = req.params.id;
            try {
                const result = await Course.deleteOne({ _id: courseId, });
                console.log(JSON.stringify(result));

                res.redirect("/");

            } catch (error) {
                console.error('Error :', error.message);
                res.render(`/course/details/${courseId}`, { errorMessage: error.message, });
            }
        },

    },
    post: {
        async create(req, res, next) {
            try {
                const entry = req.body;
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', };
                const date = new Date(Date.now()).toLocaleDateString("en-US", options);
                const newCourse = new Course({
                    'title': entry.title,
                    'description': entry.description,
                    'imageUrl': entry.imageUrl,
                    'duration': entry.duration,
                    'created': date,
                    'users': [],
                });

                const course = await newCourse.save();

                //when success
                if (course) {
                    console.log(JSON.stringify(course));
                    return res.redirect(`/course/details/${course._id}`);
                }
                res.render('course/create');

            } catch (error) {
                console.error("Error: ", error.message);
                return res.render('course/create', { errorMessage: error, });
            }
            next();
        },
        async update(req, res, next) {
            try {
                const courseId = req.params.id;
                const entry = req.body;

                const result = await Course.updateOne({ _id: courseId, }, {
                    'title': entry.title,
                    'description': entry.description,
                    'imageUrl': entry.imageUrl,
                    'duration': entry.duration,
                });
                if (result) {

                    console.log(JSON.stringify(result));
                    return res.redirect(`/course/details/${courseId}`);
                }
                res.render('course/edit');

            } catch (error) {
                console.error('Error: ' + error);
                return res.render('course/edit', { errorMessage: error, })
            }
            next();
        },
    },
    getCourse,
    getCourses,
}