const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },],
});

module.exports = mongoose.model('Course', courseSchema, 'courses');
