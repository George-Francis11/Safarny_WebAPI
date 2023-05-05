const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// admin schema
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
});

// admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;