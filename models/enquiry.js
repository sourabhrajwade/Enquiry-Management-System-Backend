const mongoose = require("mongoose");
const validator = require("validator");

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Nil'
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator.isEmail]
    },
    phone: {
        type: Number,
        required: true, 
    },
    course: {
        type: String,
        required: true,
        enum: ['course 1', 'course 2', 'course 3'],
        default: 'course 1'
    },
    query: {
        type: String,
        required: true
    }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema, 'enquiry');

module.exports = Enquiry;