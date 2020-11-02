const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
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
    createdAt: {
        type: Date,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },],
});

// Create search index "text" for schema properties in this case "title" and "description"
courseSchema.index({ title: "text", description: "text", });

module.exports = mongoose.model('Course', courseSchema, 'courses');
