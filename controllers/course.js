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

const getUserslikedCourse = async (courseId) => {

    return User.find({ courses: { $in: courseId, }, }).lean();
}

module.exports = {
    get: {
        async details(req, res) {
            const courseId = req.params.id;
            try {
                const currentUser = req.user._id;
                const course = await getCourse(courseId);
                const isCreator = Boolean(course.creator === req.user._id);

                // Find array of users in course with courseId
                const users = await getUserslikedCourse(courseId);

                const isLiked = Boolean(users.some(user => user._id.toString() === currentUser));

                res.render('course/details', {
                    title: "Express Retake Exam January 2019",
                    ...course,
                    isLiked: isLiked,
                    isCreator: isCreator,
                });

            } catch (error) {
                console.error('Error :', error);
                res.render('/', { errorMessage: error.message, });
            }
        },
        create(req, res) {
            res.render('course/create', { title: "Create page", });
        },
        async update(req, res) {
            const courseId = req.params.id;
            try {
                const course = await getCourse(courseId);
                res.render('course/edit', { title: "Express Retake Exam January 2019", ...course, });

            } catch (error) {
                console.error('Error :', error);
                res.render('course/edit', { errorMessage: error.message, });
            }
        },
        async like(req, res) {
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
                const date = new Date(Date.now()).toLocaleDateString();
                const newCourse = new Course({
                    'title': entry.title,
                    'description': entry.description,
                    'imageUrl': entry.imageUrl,
                    'isPublic': Boolean(entry.isPublic === 'on'),
                    'creator': req.user._id,
                    'created': date,
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
                    'isPublic': entry.isPublic || false,
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
        async delete(req, res, next) {
            try {
                const courseId = req.params.id;

                const result = await Course.deleteOne({ _id: courseId, });
                console.log(JSON.stringify(result));

                res.redirect("/");

            } catch (error) {
                console.error('Error: ' + error);
                res.render('course/delete', { errorMessage: error.message, });
            }
            next();
        },
    },
    getCourse,
    getCourses,
}