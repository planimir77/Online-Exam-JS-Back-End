const mongoose = require('mongoose');
//const validator = require('node-mongoose-validator');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
    },
    imageUrl: {
        type: String,
        required: true,
        //validate: validator.isURL({ protocols: ['http', 'https',], require_protocol: true, }),
    },
    cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube', },],
});

module.exports = mongoose.model('Accessory', accessorySchema, 'accessories');
